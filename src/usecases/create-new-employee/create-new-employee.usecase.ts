import { Employee } from "@/entities/employee";
import { InvalidEmailError } from "@/entities/errors/invalid-email";
import { InvalidNameError } from "@/entities/errors/invalid-name";
import { NewEmployeeDTO } from "@/entities/ports/dto/new-employee-dto";
import { DuplicatedEmailError } from "@/repository/errors/duplicated-email-error";
import { EmployeeRepository } from "@/repository/ports/employee-repository";
import { Either, left } from "@/shared/either";

export class CreateNewEmployee {
  private repository: EmployeeRepository;

  constructor(repository: EmployeeRepository) {
    this.repository = repository;
  }

  async execute({
    email,
    name,
    type,
  }: NewEmployeeDTO): Promise<
    Either<
      InvalidNameError | InvalidEmailError | DuplicatedEmailError,
      Employee
    >
  > {
    const employeeOrError = Employee.create({ email, name, type });
    if (employeeOrError.isLeft()) {
      return left(employeeOrError.value);
    }
    const employeeFoundedOrNull = await this.repository.findEmployeeByEmail(
      email
    );
    if (employeeFoundedOrNull.isRight()) {
      if (employeeFoundedOrNull.value) {
        return left(new DuplicatedEmailError());
      }
    }
    const saved = await this.repository.save(employeeOrError.value);
    return saved;
  }
}
