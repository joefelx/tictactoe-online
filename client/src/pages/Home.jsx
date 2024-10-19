import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="home">
      <h1>TICTACTOE</h1>
      <button onClick={() => navigate("/lobby")}>START</button>
    </div>
  );
}
