export class DuplicatedEmailError extends Error {
  public name: string = "DuplicatedEmailError";

  constructor() {
    super("Este e-mail já está cadastrado!");
  }
}
