import React from "react";
import { useNavigate } from "react-router-dom";
import { playClickSound } from "../sounds/sounds";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <div className="auth-box">

        <h1>🎮 Welcome Player</h1>
        <p>Ready to start your mission?</p>

        <button
          onClick={() => {
            playClickSound();
            navigate("/game");
          }}
        >
          START GAME
        </button>

      </div>
    </div>
  );
};

export default Dashboard;