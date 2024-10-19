"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RoomManager {
    constructor() {
        this.rooms = [];
    }
    add(room) {
        this.rooms.push(room);
    }
    get(id) {
        const room = this.rooms.find((room) => room.getId() === id);
        if (!room)
            throw new Error("No room present.");
        return room;
    }
    remove(id) {
        this.rooms = this.rooms.filter((room) => room.getId() === id);
    }
}
exports.default = RoomManager;
