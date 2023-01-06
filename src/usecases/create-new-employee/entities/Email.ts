export class Email {
  private email: string;

  constructor(email: string) {
    this.email = email;
  }

  static create(email: string): Email {
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
