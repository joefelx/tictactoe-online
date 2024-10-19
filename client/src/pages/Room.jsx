import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";

export default function Room() {
  const navigate = useNavigate();
  const [role, setRole] = useState("2");

  function createRoom() {
    socket.emit("create-room", {
      creator: role,
    });
  }

  useEffect(() => {
    socket.on("created-room", (data) => {
      window.localStorage.setItem("player", JSON.stringify(data));
      navigate("/game/" + data.roomId);
    });
  }, [socket]);

  return (
    <div className="homePage">
      <div className="roomPage">
        <div className="roleContainer">
          <span>Select Role</span>
          <select onChange={(e) => setRole(e.target.value)} value={role}>
            <option value="2" key="x">
              X
            </option>
            <option value="5" key="o">
              O
            </option>
          </select>
        </div>
        <button onClick={createRoom}>Create Room</button>
      </div>
    </div>
  );
}
