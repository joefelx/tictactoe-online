import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Ximage from "../assets/x.png";
import Oimage from "../assets/o.png";
import { socket } from "../socket";

export default function Game() {
  const navigate = useNavigate();
  const [player, setPlayer] = useState();
  const [nextMove, setNextMove] = useState();
  const [winner, setWinner] = useState(null);
  const [gameOver, setGameOver] = useState(null);
  const [board, setBoard] = useState(new Array(9).fill(0));
  const [roomId, setRoomId] = useState("");
  const [waiting, setWaiting] = useState(false);
  const [joined, setJoined] = useState(false);

  const params = useParams();

  const Choice = ({ player, nextMove }) => {
    return (
      <>
        {player === 2 ? (
          <>
            <span className={nextMove === 2 ? "active" : ""}>X</span>
            <span className={player === nextMove ? "active" : ""}>
              {player === nextMove ? " Move!!" : "Wait..."}
            </span>
            <span className={nextMove === 5 ? "active" : ""}>O</span>
          </>
        ) : (
          <>
            <span className={nextMove === 5 ? "active" : ""}>O</span>
            <span className={player === nextMove ? "active" : ""}>
              {player === nextMove ? " Move!!" : "Wait..."}
            </span>
            <span className={nextMove === 2 ? "active" : ""}>X</span>
          </>
        )}
      </>
    );
  };

  function handleButtonClick(fn, ...params) {
    if (waiting) {
      alert("Wait");
    } else {
      fn(...params);
    }
  }

  function play(index, player) {
    socket.emit("move", {
      index,
      player,
      roomId,
    });
  }

  function playAgain() {
    socket.emit("reset", roomId);
    navigate("/");
  }

  useEffect(() => {
    const data = JSON.parse(window.localStorage.getItem("player"));
    setPlayer(data["role"]);
    setRoomId(params.roomId);
  }, []);

  useEffect(() => {
    socket.emit("start", {
      roomId: params.roomId,
    });

    socket.on("start", (data) => {
      setJoined(data.full);
      setBoard(data.board);
      setNextMove(data.nextMove);
    });

    socket.on("joined", (data) => {
      setJoined(true);
      setBoard(data.board);
      setNextMove(data.nextMove);
    });

    socket.on("move", (data) => {
      setBoard(data.board);
      setGameOver(data.gameOver);
      setWinner(data.winner);
      setNextMove(data.nextMove);
    });

    socket.on("wait", (data) => {
      setWaiting(data.state);
    });
  }, [socket]);

  return (
    <div className="gamePage">
      <div className="gameSide">
        {!joined && (
          <div className="gameCode">
            <span>Room ID: </span>
            <span className="roomId">{roomId}</span>
          </div>
        )}

        <div className="gameChoice">
          {joined ? (
            <Choice player={player} nextMove={nextMove} />
          ) : (
            <span>Waiting for another player</span>
          )}
        </div>
        <div className="gameBox">
          {board.map((a, index) => (
            <button
              key={index}
              className="box"
              onClick={() => {
                handleButtonClick(play, index, player);
              }}
              disabled={!joined || a !== 0 ? true : false}
            >
              {a === 2 && <img src={`${Ximage}`} alt="x" />}
              {a === 5 && <img src={`${Oimage}`} alt="o" />}
            </button>
          ))}
        </div>
      </div>
      <div
        className="overlay"
        style={{ display: winner || gameOver ? "flex" : "none" }}
      >
        <div className="overlayContent">
          {winner ? (
            <>
              {winner === player ? (
                <h1 className="win">Congradulations!! </h1>
              ) : (
                <h1>Better luck next time!</h1>
              )}
            </>
          ) : (
            <h1>
              <span>Draw</span>
            </h1>
          )}
          <button onClick={playAgain}>Play Again</button>
        </div>
      </div>
    </div>
  );
}
