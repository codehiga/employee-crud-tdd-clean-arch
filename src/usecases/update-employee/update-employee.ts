import { Employee } from "@/entities/employee";
import { UpdateEmployeeDTO } from "@/entities/ports/dto/update-employee-dto";
import { UserToUpdateNotFoundError } from "@/repository/errors/user-to-update-not-found-error";
import { EmployeeRepository } from "@/repository/ports/employee-repository";
import { Either } from "@/shared/either";

export class UpdateEmployee {
  private readonly repository: EmployeeRepository;

  constructor(repository: EmployeeRepository) {
    this.repository = repository;
  }

  async execute(
    email: string,
    employeeUpdateData: UpdateEmployeeDTO
  ): Promise<Either<UserToUpdateNotFoundError, Employee>> {
    const response = await this.repository.update(email, employeeUpdateData);
    return response;
  }
}
