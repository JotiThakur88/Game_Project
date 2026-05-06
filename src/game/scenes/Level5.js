import Phaser from "phaser";

export default class Level5 extends Phaser.Scene {
  constructor() {
    super("Level5");
  }

  create() {
    const { width, height } = this.scale;

    this.cameras.main.setBackgroundColor("#0f172a");

    this.add.text(width / 2, 60, "LEVEL 5 : SLIDING PUZZLE", {
      fontSize: "32px",
      fontStyle: "bold",
      color: "#38bdf8",
    }).setOrigin(0.5);

    this.size = 3;
    this.tileSize = 110;
    this.startX = width / 2 - this.tileSize;
    this.startY = height / 2 - this.tileSize;

    this.tiles = [];
    this.empty = { row: 2, col: 2 };

    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, null];
    Phaser.Utils.Array.Shuffle(numbers);

    let index = 0;

    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        const value = numbers[index++];
        if (value === null) {
          this.empty = { row, col };
          continue;
        }

        const x = this.startX + col * this.tileSize;
        const y = this.startY + row * this.tileSize;

        const tile = this.add.rectangle(
          x,
          y,
          95,
          95,
          0x1e293b
        ).setStrokeStyle(2, 0x38bdf8)
         .setInteractive({ useHandCursor: true });

        const text = this.add.text(x, y, value, {
          fontSize: "32px",
          fontStyle: "bold",
          color: "#e5e7eb",
        }).setOrigin(0.5);

        tile.row = row;
        tile.col = col;
        tile.value = value;
        tile.text = text;

        tile.on("pointerdown", () => this.tryMove(tile));

        this.tiles.push(tile);
      }
    }
  }

  tryMove(tile) {
    const dr = Math.abs(tile.row - this.empty.row);
    const dc = Math.abs(tile.col - this.empty.col);

    if (dr + dc !== 1) return;

    const oldRow = tile.row;
    const oldCol = tile.col;

    tile.row = this.empty.row;
    tile.col = this.empty.col;
    this.empty = { row: oldRow, col: oldCol };

    const x = this.startX + tile.col * this.tileSize;
    const y = this.startY + tile.row * this.tileSize;

    this.tweens.add({
      targets: [tile, tile.text],
      x,
      y,
      duration: 120,
      ease: "Power2",
      onComplete: () => this.checkWin(),
    });
  }

  checkWin() {
    for (let tile of this.tiles) {
      const correctRow = Math.floor((tile.value - 1) / this.size);
      const correctCol = (tile.value - 1) % this.size;

      if (tile.row !== correctRow || tile.col !== correctCol) return;
    }

    this.add.text(this.scale.width / 2, this.scale.height - 100, "PUZZLE SOLVED 🎉", {
      fontSize: "28px",
      fontStyle: "bold",
      color: "#22c55e",
    }).setOrigin(0.5);

    this.time.delayedCall(1500, () => {
      this.scene.start("LevelSelect");
    });
  }
}