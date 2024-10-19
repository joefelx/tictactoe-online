"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GameManager {
    constructor() {
        this.games = [];
    }
    add(game) {
        this.games.push(game);
    }
    get(id) {
        const game = this.games.find((game) => game.getId() === id);
        if (!game)
            throw new Error("No Game present");
        return game;
    }
    remove(id) {
        this.games = this.games.filter((game) => game.getId() === id);
    }
}
exports.default = GameManager;
