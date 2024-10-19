import http from "http";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Server } from "socket.io";

import { Role } from "./models/enum/GameEnum";
import Code from "./lib/Code";
import RoomManager from "./models/RoomManager";
import GameManager from "./models/GameManager";
import Game from "./models/Game";
import Room from "./models/Room";
import Player from "./models/Player";

dotenv.config();
const PORT: string | number = process.env.PORT || 5000;
const URL: string = process.env.URL || "http://localhost:5173";

const app = express();
app.use(
  cors({
    origin: URL,
  })
);
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: URL,
    methods: ["GET", "POST"],
  },
});

const gameManager = new GameManager();
const roomManager = new RoomManager();

let currentPlayer: Role = Role.X;

io.on("connection", (socket) => {
  console.log("User Connected: ", socket.id);
  socket.emit("id", socket.id);

  socket.on("create-room", (data) => {
    const player = new Player(
      socket.id,
      data.creator === "5" ? Role.O : Role.X
    );

    // creating room id
    const code = Code.generate(5);
    // creating new game
    const game = new Game(code);
    // creating new room
    const room = new Room(code, game.getId(), player);

    console.log("Room created: ", room.getId());
    room.setPlayerOne(player);

    gameManager.add(game);
    roomManager.add(room);

    socket.join(code);
    console.log("Player 1 joined: ", room.getId());

    io.to(code).emit("created-room", {
      socketId: socket.id,
      role: player.getRole(),
      roomId: code,
      gameId: game.getId(),
    });
  });

  socket.on("join-room", (data) => {
    try {
      // get room and game
      let room = roomManager.get(data.roomId);
      let game = gameManager.get(data.roomId);

      if (room.getPlayerTwo()) {
        throw new Error("Room Already Full.");
      }

      // assigning roles for the player 2
      let playerOne = room.getPlayerOne();
      let playerTwo = new Player(
        socket.id,
        playerOne.getRole() === Role.O ? Role.X : Role.O
      );

      // adding player 2 to the room
      room.setPlayerTwo(playerTwo);

      // joined to the room
      socket.join(data.roomId);
      console.log("Player 2 joined: ", room.getId());

      // notifing the client
      socket.emit("joined-room", {
        socketId: socket.id,
        role: playerTwo.getRole(),
        roomId: room.getId(),
        gameId: game.getId(),
      });

      io.to(room.getId()).emit("joined", {
        board: game.getBoard(),
        nextMove: room.getPlayerOne().getRole(),
      });
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("start", (data) => {
    try {
      console.log("Joined to ", data.roomId);

      const room = roomManager.get(data.roomId);
      const game = gameManager.get(data.roomId);

      const playerOne = room.getPlayerOne().getRole();
      const board = game.getBoard();

      const playerTwo = room.getPlayerTwo();
      socket.emit("start", {
        board,
        nextMove: playerOne,
        full: playerTwo === null ? false : true,
      });
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("move", (data) => {
    const game = gameManager.get(data.roomId);

    if (data.player === currentPlayer) {
      currentPlayer = data.player === Role.X ? Role.O : Role.X;
      socket.emit("wait", {
        state: true,
      });
    }
    if (currentPlayer !== data.player) {
      socket.broadcast.emit("wait", {
        state: false,
      });
    }

    const result = game.setBoard(data.index, data.player);

    game.check();

    const response = {
      board: game.getBoard(),
      nextMove: currentPlayer,
      gameOver: game.isGameOver(),
      draw: game.isDraw(),
      status: result,
      winner: game.getWinner(),
    };
    io.to(data.roomId).emit("move", response);
  });

  socket.on("reset", (data) => {
    console.log("Deleting Room: ", data);

    const roomId = data.roomId;
    roomManager.remove(roomId);
    gameManager.remove(roomId);
  });
});

server.listen(PORT, () => console.log(`Server connected to port ${PORT}`));
