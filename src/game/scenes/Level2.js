import Phaser from "phaser";

export default class Level2 extends Phaser.Scene {
  constructor() {
    super("Level2");
  }

  preload() {
    this.load.audio("click", "/sounds/level.mp3");
  }

  create() {
    this.cameras.main.setBackgroundColor("#070a1a");

    const title = this.add.text(400, 60, "🧠 MEMORY CHALLENGE", {
      fontSize: "36px",
      color: "#00ffcc",
      fontStyle: "bold",
    }).setOrigin(0.5);

    this.tweens.add({
      targets: title,
      y: 80,
      duration: 1200,
      yoyo: true,
      repeat: -1,
    });

    this.clickSound = this.sound.add("click");

    this.cards = [
      "🍎","🍎",
      "🍌","🍌",
      "🍇","🍇",
      "🍉","🍉",
      "🍒","🍒",
      "🍍","🍍",
      "🥝","🥝",
      "🍓","🍓"
    ];

    Phaser.Utils.Array.Shuffle(this.cards);

    this.flipped = [];
    this.matched = [];

    this.createBoard();
  }

  createBoard() {
    let startX = 150;
    let startY = 180;
    let cols = 4;

    this.cards.forEach((value, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);

      const x = startX + col * 150;
      const y = startY + row * 140;

      const card = this.add.rectangle(x, y, 110, 110, 0x1c1f3a)
        .setStrokeStyle(3, 0x00ffcc)
        .setInteractive({ useHandCursor: true });

      this.add.tween({
        targets: card,
        alpha: 0.9,
        duration: 1000,
        yoyo: true,
        repeat: -1,
      });

      const text = this.add.text(x, y, "", {
        fontSize: "34px",
      }).setOrigin(0.5);

      card.setData("value", value);
      card.setData("flipped", false);
      card.setData("index", index);

      card.on("pointerdown", () => {
        if (
          this.flipped.length === 2 ||
          card.getData("flipped") ||
          this.matched.includes(index)
        )
          return;

        if (this.clickSound) this.clickSound.play();

        this.flipCard(card, text);
      });
    });
  }

  flipCard(card, text) {
    const value = card.getData("value");
    const index = card.getData("index");

    card.setData("flipped", true);

    this.tweens.add({
      targets: card,
      scaleX: 0,
      duration: 120,
      onComplete: () => {
        text.setText(value);

        this.tweens.add({
          targets: card,
          scaleX: 1,
          duration: 120,
        });
      },
    });

    this.flipped.push({ card, text, value, index });

    if (this.flipped.length === 2) {
      this.time.delayedCall(600, () => {
        this.checkMatch();
      });
    }
  }

  checkMatch() {
    const [c1, c2] = this.flipped;

    if (c1.value === c2.value) {
      this.matched.push(c1.index, c2.index);

      this.tweens.add({
        targets: [c1.card, c2.card],
        scale: 1.2,
        duration: 200,
        yoyo: true,
      });
    } else {
      this.time.delayedCall(500, () => {
        this.flipBack(c1);
        this.flipBack(c2);
      });
    }

    this.flipped = [];

    if (this.matched.length === this.cards.length) {
      this.add.text(400, 450, "🎉 LEVEL COMPLETED!", {
        fontSize: "42px",
        color: "#ffff00",
        fontStyle: "bold",
      }).setOrigin(0.5);

      this.cameras.main.flash(300, 255, 255, 255);

      this.time.delayedCall(2000, () => {
        this.scene.start("Level3");
      });
    }
  }

  flipBack(obj) {
    this.tweens.add({
      targets: obj.card,
      scaleX: 0,
      duration: 120,
      onComplete: () => {
        obj.text.setText("");

        this.tweens.add({
          targets: obj.card,
          scaleX: 1,
          duration: 120,
        });

        obj.card.setData("flipped", false);
      },
    });
  }
}