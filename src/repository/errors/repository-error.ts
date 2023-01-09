export class RepositoryError extends Error {
  public name: string = "";

  constructor(erro: string) {
    super(erro);
  }
}
