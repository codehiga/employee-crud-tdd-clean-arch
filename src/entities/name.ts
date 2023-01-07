import { Either, left, right } from "@/shared/either";
import { InvalidNameError } from "./errors/invalid-name";

export class Name {
  public value: string;

  constructor(name: string) {
    this.value = name;
  }

  static create(name: string): Either<InvalidNameError, Name> {
    if (!this.valid(name)) {
      return left(new InvalidNameError());
    }
    return right(new Name(name));
  }

  static valid(name: string): boolean {
    if (name.trim().length < 3) {
      return false;
    }
    return true;
  }
}
