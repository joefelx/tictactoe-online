"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const GameEnum_1 = require("./models/enum/GameEnum");
const Code_1 = __importDefault(require("./lib/Code"));
const RoomManager_1 = __importDefault(require("./models/RoomManager"));
const GameManager_1 = __importDefault(require("./models/GameManager"));
const Game_1 = __importDefault(require("./models/Game"));
const Room_1 = __importDefault(require("./models/Room"));
const Player_1 = __importDefault(require("./models/Player"));
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
const URL = process.env.URL || "http://localhost:5173";
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: URL,
}));
app.use(express_1.default.json());
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: URL,
        methods: ["GET", "POST"],
    },
});
const gameManager = new GameManager_1.default();
const roomManager = new RoomManager_1.default();
let currentPlayer = GameEnum_1.Role.X;
io.on("connection", (socket) => {
    console.log("User Connected: ", socket.id);
    socket.emit("id", socket.id);
    socket.on("create-room", (data) => {
        const player = new Player_1.default(socket.id, data.creator === "5" ? GameEnum_1.Role.O : GameEnum_1.Role.X);
        // creating room id
        const code = Code_1.default.generate(5);
        // creating new game
        const game = new Game_1.default(code);
        // creating new room
        const room = new Room_1.default(code, game.getId(), player);
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
            let playerTwo = new Player_1.default(socket.id, playerOne.getRole() === GameEnum_1.Role.O ? GameEnum_1.Role.X : GameEnum_1.Role.O);
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
        }
        catch (error) {
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
        }
        catch (error) {
            console.log(error);
        }
    });
    socket.on("move", (data) => {
        const game = gameManager.get(data.roomId);
        if (data.player === currentPlayer) {
            currentPlayer = data.player === GameEnum_1.Role.X ? GameEnum_1.Role.O : GameEnum_1.Role.X;
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
