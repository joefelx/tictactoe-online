import Player from "./Player";

export default class Room {
  private roomId: string;
  private gameId: string;
  private playerOne: Player;
  private playerTwo: Player | null;

  constructor(roomId: string, gameId: string, playerOne: Player) {
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
  setPlayerOne(player: Player) {
    this.playerOne = player;
  }
  setPlayerTwo(player: Player) {
    this.playerTwo = player;
  }
}
