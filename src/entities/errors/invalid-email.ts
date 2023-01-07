export class InvalidEmailError extends Error {
  public readonly name = "InvalidEmailError";
  constructor() {
    super(`O email inserido é inválido!`);
  }
}
