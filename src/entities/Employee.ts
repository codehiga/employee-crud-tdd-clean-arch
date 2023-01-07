import { NewEmployeeDTO } from "../dto/new-employee-dto";
import { Email } from "./Email";

export class Employee {
  public name: string;
  public email: Email;
  public type: string;

  constructor(name: string, email: Email, type: string) {
    this.name = name;
    this.email = email;
    this.type = type;
  }

  static create({ name, email, type }: NewEmployeeDTO) {
    let emailValid = Email.create(email);
    if (emailValid) {
      const employee = new Employee(name, emailValid, type);
      return employee;
    } else {
      return null;
    }
  }
}
