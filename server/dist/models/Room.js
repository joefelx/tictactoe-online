"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Room {
    constructor(roomId, gameId, playerOne) {
        this.roomId = roomId;
        this.gameId = gameId;
        this.playerOne = playerOne;
        this.playerTwo = null;
    }
    getId() {
        return this.roomId;
    }
    getGameId() {
        return this.gameId;
    }
    getPlayerOne() {
        return this.playerOne;
    }
    getPlayerTwo() {
        return this.playerTwo;
    }
    setPlayerOne(player) {
        this.playerOne = player;
    }
    setPlayerTwo(player) {
        this.playerTwo = player;
    }
}
exports.default = Room;
