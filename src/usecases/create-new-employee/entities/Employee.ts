import { NewEmployeeDTO } from "../dto/newEmployeeDTO";
import { Email } from "./Email";

export class Employee {
  private name: string;
  private email: Email;
  private type: string;

  constructor(name: string, email: Email, type: string) {
    this.name = name;
    this.email = email;
    this.type = type;
  }

  static create({ name, email, type }: NewEmployeeDTO) {
    if (!Email.isValidEmail(email)) {
      return false;
    }
    const emailValid = Email.create(email);
    const employee = new Employee(name, emailValid, type);
    return employee;
  }
}
