import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const playStartSound = () => {
    const audio = new Audio("sounds/start.wav");
    audio.play();
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>🎮 Welcome Player</h1>
        <p>Ready to start your mission?</p>

        <button
          onClick={() => {
            playStartSound(); // 🔊 sound play
            setTimeout(() => {
             navigate("/game");
            }, 300);
          }}
        >
          START GAME
        </button>
      </div>
    </div>
  );
};

export default Dashboard;