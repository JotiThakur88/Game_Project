import { useEffect, useRef } from "react";
import Phaser from "phaser";

import LevelSelect from "./scenes/LevelSelect";
import Level1 from "./scenes/Level1";
import Level2 from "./scenes/Level2";
import Level3 from "./scenes/Level3";
import Level4 from "./scenes/Level4";
import Level5 from "./scenes/Level5";

export default function Game() {
  const gameRef = useRef(null);

  useEffect(() => {
    if (gameRef.current) return;

    const config = {
      type: Phaser.AUTO,
      parent: "phaser-container",
      width: window.innerWidth,
      height: window.innerHeight,
      physics: {
        default: "arcade",
        arcade: { debug: false },
      },
      scene: [LevelSelect, Level1, Level2, Level3, Level4, Level5],
    };

    const game = new Phaser.Game(config);
    gameRef.current = game;

    game.scene.start("LevelSelect");

    return () => {
      game.destroy(true);
      gameRef.current = null;
    };
  }, []);

  return (
    <div
      id="phaser-container"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
}