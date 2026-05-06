import Phaser from "phaser";

export default class LevelSelect extends Phaser.Scene {
  constructor() {
    super("LevelSelect");
  }

  preload() {
    this.load.audio("click", "/sounds/level.mp3");
  }

  create() {
    const { width, height } = this.scale;

    this.cameras.main.setBackgroundColor("#0e0f2b");
    this.clickSound = this.sound.add("click", { volume: 1 });

    const title = this.add.text(width / 2, height * 0.12, "LEVEL SELECT", {
      fontSize: "42px",
      fontStyle: "bold",
      color: "#7df9ff",
    }).setOrigin(0.5);

    this.tweens.add({
      targets: title,
      y: title.y + 10,
      duration: 1200,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });

    const levels = [
      { label: "LEVEL 1", key: "Level1", color: 0x3b82f6 },
      { label: "LEVEL 2", key: "Level2", color: 0x22c55e },
      { label: "LEVEL 3", key: "Level3", color: 0xf59e0b },
      { label: "LEVEL 4", key: "Level4", color: 0xec4899 },
      { label: "LEVEL 5", key: "Level5", color: 0xa855f7 },
    ];

    const cols = 3;
    const cardW = width * 0.22;
    const cardH = height * 0.18;
    const gapX = width * 0.06;
    const gapY = height * 0.1;

    const startX =
      width / 2 - ((cols - 1) * (cardW + gapX)) / 2;

    const startY = height * 0.35;

    levels.forEach((lvl, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = startX + col * (cardW + gapX);
      const y = startY + row * (cardH + gapY);

      const glow = this.add.rectangle(
        x,
        y,
        cardW + 20,
        cardH + 20,
        lvl.color,
        0.25
      ).setVisible(false);

      const card = this.add.rectangle(
        x,
        y,
        cardW,
        cardH,
        lvl.color,
        0.85
      ).setInteractive({ useHandCursor: true });

      const label = this.add.text(x, y, lvl.label, {
        fontSize: "22px",
        fontStyle: "bold",
        color: "#ffffff",
      }).setOrigin(0.5);

      this.tweens.add({
        targets: [card, label],
        alpha: { from: 0, to: 1 },
        scale: { from: 0.6, to: 1 },
        delay: i * 120,
        duration: 450,
        ease: "Back.easeOut",
      });

      card.on("pointerover", () => {
        glow.setVisible(true);
        card.setFillStyle(lvl.color, 1);
        label.setScale(1.15);
      });

      card.on("pointerout", () => {
        glow.setVisible(false);
        card.setFillStyle(lvl.color, 0.85);
        label.setScale(1);
      });

      card.on("pointerdown", () => {
        this.clickSound.play();
        this.tweens.add({
          targets: [card, label],
          scaleX: 0.92,
          scaleY: 0.92,
          yoyo: true,
          duration: 100,
          onComplete: () => {
            this.scene.start(lvl.key);
          },
        });
      });
    });
  }
}