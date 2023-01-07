import { NewEmployeeDTO } from "@/dto/new-employee-dto";
import { Employee } from "@/entities/employee";
import { InvalidEmailError } from "@/entities/errors/invalid-email";
import { InvalidNameError } from "@/entities/errors/invalid-name";
import { EmployeeRepository } from "@/ports/employee-repository";
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
    Either<InvalidNameError | InvalidEmailError, void>
  > {
    const employeeOrError = Employee.create({ email, name, type });
    if (employeeOrError.isLeft()) {
      return left(employeeOrError.value);
    }
    const saveOrError = await this.repository.save(employeeOrError.value);
    if (saveOrError?.isLeft()) {
      return left(saveOrError.value);
    }
    return;
  }
}
