import { useState } from "react";
import levels from "../game/GamePageLogic";
import { playClickSound, playSuccessSound } from "../sounds/sounds";

const GamePage = () => {
  const [level, setLevel] = useState(0);

  const current = levels[level];

  const nextLevel = () => {
    playSuccessSound();

    if (level < levels.length - 1) {
      setLevel(level + 1);
    } else {
      alert("🎉 Game Completed!");
    }
  };

  return (
    <div>
      <h2>Level {current.id}: {current.title}</h2>
      <p>{current.story || current.task}</p>

      <textarea placeholder="Write code..." />

      <button
        onClick={() => {
          playClickSound();
          nextLevel();
        }}
      >
        Submit & Next
      </button>
    </div>
  );
};

export default GamePage;