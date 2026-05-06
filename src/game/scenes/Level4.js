import Phaser from "phaser";

export default class Level4 extends Phaser.Scene {
  constructor() {
    super("Level4");
  }

  create() {
    this.cameras.main.setBackgroundColor("#1a1a1a");

    this.add.rectangle(400, 300, 800, 600, 0x111111);

    this.add.text(260, 40, "❌ TIC TAC TOE - LEVEL 4 ❌", {
      fontSize: "26px",
      color: "#ffffff",
      fontStyle: "bold",
    });

    this.board = Array(9).fill(null);
    this.currentPlayer = "X";
    this.gameOver = false;

    this.cells = [];

    // 🎯 CENTER GRID START POSITION
    const startX = 300;
    const startY = 120;
    const size = 100;

    let index = 0;

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        let x = startX + col * size;
        let y = startY + row * size;

        let cell = this.add.rectangle(x, y, 90, 90, 0x2b2b2b)
          .setStrokeStyle(3, 0xffffff)
          .setInteractive();

        cell.index = index;

        cell.on("pointerdown", () => {
          this.makeMove(cell);
        });

        this.cells.push(cell);
        index++;
      }
    }

    this.statusText = this.add.text(320, 450, "Turn: X", {
      fontSize: "22px",
      color: "#ffffff",
    });
  }

  makeMove(cell) {
    if (this.gameOver) return;
    if (this.board[cell.index]) return;

    this.board[cell.index] = this.currentPlayer;

    this.drawSymbol(cell, this.currentPlayer);

    if (this.checkWinner(this.currentPlayer)) {
      return this.endGame(this.currentPlayer);
    }

    if (this.isDraw()) {
      return this.endGame("DRAW");
    }

    this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
    this.statusText.setText("Turn: " + this.currentPlayer);

    if (this.currentPlayer === "O") {
      this.time.delayedCall(300, () => this.aiMove());
    }
  }

  aiMove() {
    if (this.gameOver) return;

    let empty = this.board
      .map((v, i) => (v === null ? i : null))
      .filter(v => v !== null);

    if (!empty.length) return;

    let move = Phaser.Math.RND.pick(empty);

    this.board[move] = "O";
    this.drawSymbol(this.cells[move], "O");

    if (this.checkWinner("O")) {
      return this.endGame("O");
    }

    this.currentPlayer = "X";
    this.statusText.setText("Turn: X");
  }

  drawSymbol(cell, player) {
    this.add.text(cell.x - 15, cell.y - 25, player, {
      fontSize: "40px",
      color: player === "X" ? "#00ffcc" : "#ff5555",
    });
  }

  checkWinner(p) {
    const winPatterns = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6],
    ];

    return winPatterns.some(pattern =>
      pattern.every(i => this.board[i] === p)
    );
  }

  isDraw() {
    return this.board.every(v => v !== null);
  }

  endGame(result) {
    this.gameOver = true;

    if (result === "DRAW") {
      this.add.text(330, 500, "🤝 DRAW!", {
        fontSize: "30px",
        color: "#ffffff",
      });
    } else {
      this.add.text(280, 500, `🏆 ${result} WINS!`, {
        fontSize: "30px",
        color: "#00ff00",
      });
    }

    this.time.delayedCall(2000, () => {
      this.scene.start("Level5");
    });
  }
}