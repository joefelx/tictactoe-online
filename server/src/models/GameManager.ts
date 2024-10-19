import Game from "./Game";
export default class GameManager {
  private games: Game[];

  constructor() {
    this.games = [];
  }

  add(game: Game) {
    this.games.push(game);
  }

  get(id: string) {
    const game = this.games.find((game) => game.getId() === id);

    if (!game) throw new Error("No Game present");

    return game;
  }

  remove(id: string) {
    this.games = this.games.filter((game) => game.getId() === id);
  }
}
