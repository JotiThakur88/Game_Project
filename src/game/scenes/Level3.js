import Phaser from "phaser";

export default class Level3 extends Phaser.Scene {
  constructor() {
    super("Level3");
  }

  preload() {
    this.load.audio("click", "/sounds/level.mp3");
  }

  create() {
    this.cameras.main.setBackgroundColor("#000000");

    this.clickSound = this.sound.add("click");

    this.add.text(400, 60, "HACKER LEVEL 3", {
      fontSize: "28px",
      color: "#00ff00",
      fontFamily: "monospace",
    }).setOrigin(0.5);

    this.add.text(400, 140, "function test(x){ return x*2+1 }", {
      fontSize: "18px",
      color: "#00ff00",
      fontFamily: "monospace",
    }).setOrigin(0.5);

    this.add.text(400, 220, "test(3) OUTPUT ?", {
      fontSize: "22px",
      color: "#ffffff",
    }).setOrigin(0.5);

    const options = [
      { text: "7", correct: true },
      { text: "6", correct: false },
      { text: "9", correct: false },
    ];

    let y = 320;

    options.forEach((opt) => {
      const box = this.add.rectangle(400, y, 200, 60, 0x111111)
        .setStrokeStyle(2, 0x00ff00)
        .setInteractive({ useHandCursor: true });

      this.add.text(400, y, opt.text, {
        fontSize: "24px",
        color: "#00ff00",
        fontFamily: "monospace",
      }).setOrigin(0.5);

      box.on("pointerdown", () => {
        if (this.clickSound) this.clickSound.play();

        if (opt.correct) {
          this.add.text(400, 450, "ACCESS GRANTED", {
            fontSize: "30px",
            color: "#00ff00",
          }).setOrigin(0.5);

          this.time.delayedCall(1500, () => {
            this.scene.start("Level4");
          });

        } else {
          this.add.text(400, 450, "WRONG ANSWER", {
            fontSize: "26px",
            color: "#ff0000",
          }).setOrigin(0.5);
        }
      });

      y += 90;
    });
  }
}