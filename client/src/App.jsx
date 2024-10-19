import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { socket } from "./socket";

import Lobby from "./pages/Lobby";
import Game from "./pages/Game";
import Footer from "./components/Footer";
import Room from "./pages/Room";
import Home from "./pages/Home";

function App() {
  useEffect(() => {
    socket.connect();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/create" element={<Room />} />
        <Route path="/game/:roomId" element={<Game />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
