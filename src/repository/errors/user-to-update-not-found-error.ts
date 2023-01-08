export class UserToUpdateNotFoundError extends Error {
  public name: string = "UserToUpdateNotFoundError";

  constructor() {
    super("Usuário não encontrado!");
  }
}
