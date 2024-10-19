import { Role } from "./enum/GameEnum";

export default class Player {
  private socketId: string;
  private role: Role;

  constructor(socketId: string, role: Role) {
    this.socketId = socketId;
    this.role = role;
  }

  getRole() {
    return this.role;
  }
}
