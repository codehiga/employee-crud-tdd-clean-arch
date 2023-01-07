import { NewEmployeeDTO } from "@/dto/new-employee-dto";
import { Either, left, right } from "@/shared/either";
import { Email } from "./email";
import { InvalidEmailError } from "./errors/invalid-email";
import { InvalidNameError } from "./errors/invalid-name";
import { Name } from "./name";

export class Employee {
  public name: string;
  public email: string;
  public type: string;

  constructor(name: string, email: string, type: string) {
    this.name = name;
    this.email = email;
    this.type = type;
  }

  static create({
    name,
    email,
    type,
  }: NewEmployeeDTO): Either<InvalidEmailError | InvalidNameError, Employee> {
    let createdName = Name.create(name);
    let createdEmail = Email.create(email);
    if (createdEmail.isLeft()) {
      return left(new InvalidEmailError());
    }
    if (createdName.isLeft()) {
      return left(new InvalidNameError());
    }
    const employee = new Employee(name, email, type);
    return right(employee);
  }
}
