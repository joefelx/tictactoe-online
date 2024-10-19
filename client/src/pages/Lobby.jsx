import "../App.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";

export default function Lobby() {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");

  function joinRoom() {
    socket.emit("join-room", {
      roomId,
    });
  }

  useEffect(() => {
    socket.on("joined-room", (data) => {
      window.localStorage.setItem("player", JSON.stringify(data));
      navigate(`/game/${data.roomId}`);
    });
  }, [socket]);

  return (
    <div className="homePage">
      {/* Create Room */}
      <div className="left">
        <h1>Create Room</h1>

        <button
          onClick={() => {
            navigate("/create");
          }}
        >
          Create
        </button>
      </div>

      {/* Join Room */}
      <div className="right">
        <h1 className="heading">Join Room</h1>
        <div className="inputs">
          <div className="inputField">
            <input
              type="text"
              placeholder="Enter code"
              onChange={(e) => {
                setRoomId(e.target.value);
              }}
            />
          </div>
          <div className="join">
            <button onClick={joinRoom}>Join</button>
          </div>
        </div>
      </div>
    </div>
  );
}
