export class Email {
  public value: string;

  constructor(email: string) {
    this.value = email;
  }

  static create(email: string): Email {
    if (!this.isValidEmail(email)) {
      return null;
    }
    return new Email(email);
  }

  static isValidEmail(email: string): boolean {
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
