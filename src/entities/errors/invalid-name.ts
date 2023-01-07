export class InvalidNameError extends Error {
  public name: string = "InvalidNameError";

  constructor() {
    super("Nome inserido é inválido!");
  }
}
