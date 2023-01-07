import { Either, left, right } from "./../shared/either";
import { InvalidEmailError } from "./errors/invalid-email";
export class Email {
  public value: string;

  constructor(email: string) {
    this.value = email;
  }

  static create(email: string): Either<InvalidEmailError, Email> {
    if (!this.valid(email)) {
      return left(new InvalidEmailError());
    }
    return right(new Email(email));
  }

  static valid(email: string): boolean {
    if (!email.includes("@")) {
      return false;
    }
    if (email.includes(" ")) {
      return false;
    }
    if (email.length > 28) {
      return false;
    }
    if (!email.includes(".")) {
      return false;
    }
    return true;
  }
}
