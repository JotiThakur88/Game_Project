export const playStartSound = () => {
  const audio = new Audio("/sounds/start.wav");
  audio.volume = 1;

  audio.play().catch((err) => {
    console.log("Start sound error:", err);
  });
};

export const playLevelSound = () => {
  const audio = new Audio("/sounds/level.mp3");
  audio.volume = 1;

  audio.play().catch((err) => {
    console.log("Level sound error:", err);
  });
};