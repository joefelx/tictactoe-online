"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GameEnum_1 = require("./enum/GameEnum");
class Game {
    constructor(id) {
        this.id = id;
        this.board = new Array(9);
        this.board.fill(0);
        this.winner = null;
        this.draw = false;
        this.gameOver = false;
    }
    getId() {
        return this.id;
    }
    // check vertical
    // [0 1 2]
    // [3 4 5]
    // [6 7 8]
    verticalCheck() {
        const verticalOne = this.board[0] + this.board[3] + this.board[6];
        const verticalTwo = this.board[1] + this.board[4] + this.board[7];
        const verticalThree = this.board[2] + this.board[5] + this.board[8];
        if (verticalOne === 15 || verticalTwo === 15 || verticalThree === 15) {
            this.setWinner(GameEnum_1.Role.O);
            this.setGameOver();
            return;
        }
        if (verticalOne === 6 || verticalTwo === 6 || verticalThree === 6) {
            this.setWinner(GameEnum_1.Role.X);
            this.setGameOver();
            return;
        }
    }
    // check horizantal
    horizantalCheck() {
        const horizantalOne = this.board[0] + this.board[1] + this.board[2];
        const horizantalTwo = this.board[3] + this.board[4] + this.board[5];
        const horizantalThree = this.board[6] + this.board[7] + this.board[8];
        if (horizantalOne === 15 ||
            horizantalTwo === 15 ||
            horizantalThree === 15) {
            this.setWinner(GameEnum_1.Role.O);
            this.setGameOver();
            return;
        }
        if (horizantalOne === 6 || horizantalTwo === 6 || horizantalThree === 6) {
            this.setWinner(GameEnum_1.Role.X);
            this.setGameOver();
            return;
        }
    }
    // check diagonal
    diagonalCheck() {
        // left diagonal
        const diagonalLeft = this.board[0] + this.board[4] + this.board[8];
        const diagonalRight = this.board[2] + this.board[4] + this.board[6];
        if (diagonalLeft === 15 || diagonalRight === 15) {
            this.setWinner(GameEnum_1.Role.O);
            this.setGameOver();
            return;
        }
        if (diagonalLeft === 6 || diagonalRight === 6) {
            this.setWinner(GameEnum_1.Role.X);
            this.setGameOver();
            return;
        }
    }
    check() {
        this.verticalCheck();
        this.horizantalCheck();
        this.diagonalCheck();
        let allFilled = true;
        for (const block of this.board) {
            if (block === 0)
                allFilled = false;
        }
        if (allFilled && this.winner === null) {
            this.setDraw();
            this.setGameOver();
        }
    }
    getWinner() {
        return this.winner;
    }
    setWinner(winner) {
        this.winner = winner;
    }
    getBoard() {
        return this.board;
    }
    setBoard(index, player) {
        if (this.board[index] !== 0)
            return GameEnum_1.Move.NOT_MOVED;
        this.board[index] = player;
        return GameEnum_1.Move.MOVED;
    }
    isDraw() {
        return this.draw;
    }
    setDraw() {
        this.draw = true;
    }
    isGameOver() {
        return this.gameOver;
    }
    setGameOver() {
        this.gameOver = true;
    }
    reset() {
        this.board = new Array(9);
        this.board.fill(0);
        this.winner = null;
        this.draw = false;
        this.gameOver = false;
    }
    print() {
        for (let i = 0; i < 9; i += 3) {
            let arr = [];
            for (let j = i; j < i + 3; j++) {
                arr.push(this.board[j]);
            }
            console.log("[" + arr + "]");
        }
        console.log(`
      gameOver: ${this.isGameOver()},
      draw: ${this.isDraw()},
      winner: ${this.getWinner()},
      `);
    }
}
exports.default = Game;
