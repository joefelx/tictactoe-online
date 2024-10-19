"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Player {
    constructor(socketId, role) {
        this.socketId = socketId;
        this.role = role;
    }
    getRole() {
        return this.role;
    }
}
exports.default = Player;
