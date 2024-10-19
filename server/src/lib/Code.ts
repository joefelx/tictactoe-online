export default class Code {
  private static code: string = "";

  static generate(length: number): string {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;

    for (let count = 0; count < length; count++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    this.code = result;
    return this.code;
  }
}
