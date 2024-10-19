import Room from "./Room";

export default class RoomManager {
  private rooms: Room[];

  constructor() {
    this.rooms = [];
  }

  add(room: Room) {
    this.rooms.push(room);
  }

  get(id: string) {
    const room = this.rooms.find((room) => room.getId() === id);
    if (!room) throw new Error("No room present.");

    return room;
  }

  remove(id: string) {
    this.rooms = this.rooms.filter((room) => room.getId() === id);
  }
}
