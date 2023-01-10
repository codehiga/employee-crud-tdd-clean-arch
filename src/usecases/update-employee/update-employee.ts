import { Employee } from "@/entities/employee";
import { UpdateEmployeeDTO } from "@/entities/ports/dto/update-employee-dto";
import { RepositoryError } from "@/repository/errors/repository-error";
import { UserToUpdateNotFoundError } from "@/repository/errors/user-to-update-not-found-error";
import { EmployeeRepository } from "@/repository/ports/employee-repository";
import { Either, right } from "@/shared/either";
import { left } from "./../../shared/either";

export class UpdateEmployee {
  private readonly repository: EmployeeRepository;

  constructor(repository: EmployeeRepository) {
    this.repository = repository;
  }

  async execute(
    email: string,
    employeeUpdateData: UpdateEmployeeDTO
  ): Promise<Either<UserToUpdateNotFoundError | RepositoryError, Employee>> {
    const exist = await this.repository.findEmployeeByEmail(email);
    if (exist.isLeft()) {
      return left(exist.value);
    }
    if (!exist.value) {
      return left(new UserToUpdateNotFoundError());
    }
    const response = await this.repository.update(email, employeeUpdateData);
    if (response.isLeft()) {
      return left(response.value);
    }
    return right(response.value);
  }
}
