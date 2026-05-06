import Phaser from "phaser";

export default class Level1 extends Phaser.Scene {
  constructor() {
    super("Level1");
  }

  preload() {
    this.load.audio("click", "/sounds/level.mp3");
  }

  create() {
    this.cameras.main.setBackgroundColor("#0b0f1a");

    this.add.text(400, 60, "🧠 LEVEL 1 - MATH PUZZLE", {
      fontSize: "34px",
      color: "#00ffcc",
    }).setOrigin(0.5);

    this.add.text(
      400,
      110,
      "Click numbers in ASCENDING RESULT ORDER",
      { fontSize: "18px", color: "#ffffff" }
    ).setOrigin(0.5);

    this.clickSound = this.sound.add("click");

    // 🧠 PUZZLE DATA (DIFFICULT)
    this.cards = [
      { q: "3+2", a: 5 },
      { q: "10-4", a: 6 },
      { q: "2×3", a: 6 },
      { q: "8÷2", a: 4 },
    ];

    // correct order by answer
    this.correct = [...this.cards]
      .sort((a, b) => a.a - b.a)
      .map((v) => v.a);

    this.user = [];

    this.msg = this.add.text(400, 500, "", {
      fontSize: "26px",
      color: "#ffff00",
    }).setOrigin(0.5);

    this.createBoard();
  }

  createBoard() {
    let x = 200;
    let y = 260;

    this.cards.forEach((item, index) => {
      const box = this.add.rectangle(x, y, 140, 120, 0x1c1f3a)
        .setStrokeStyle(3, 0x00ffcc)
        .setInteractive({ useHandCursor: true });

      this.add.text(x, y - 20, item.q, {
        fontSize: "22px",
        color: "#ffffff",
      }).setOrigin(0.5);

      this.add.text(x, y + 25, "?", {
        fontSize: "28px",
        color: "#00ffcc",
      }).setOrigin(0.5);

      box.setData("value", item.a);
      box.setData("clicked", false);

      box.on("pointerdown", () => {
        if (box.getData("clicked")) return;

        if (this.clickSound) this.clickSound.play();

        box.setData("clicked", true);

        this.user.push(item.a);

        this.tweens.add({
          targets: box,
          scale: 1.1,
          duration: 100,
          yoyo: true,
        });

        this.checkAnswer();
      });

      x += 180;
    });
  }

  checkAnswer() {
    // ❌ wrong check
    for (let i = 0; i < this.user.length; i++) {
      if (this.user[i] !== this.correct[i]) {
        this.msg.setText("❌ Wrong! Restart Level");

        this.time.delayedCall(1000, () => {
          this.scene.restart();
        });
        return;
      }
    }

    // 🎉 win
    if (this.user.length === this.correct.length) {
      this.msg.setText("🎉 Level Completed!");

      this.time.delayedCall(1500, () => {
        this.scene.start("Level2");
      });
    }
  }
}