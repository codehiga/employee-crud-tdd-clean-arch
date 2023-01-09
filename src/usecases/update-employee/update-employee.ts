import { UpdateEmployeeDTO } from "@/entities/ports/dto/update-employee-dto";
import { EmployeeRepository } from "@/repository/ports/employee-repository";

export class UpdateEmployee {
  private readonly repository: EmployeeRepository;

  constructor(repository: EmployeeRepository) {
    this.repository = repository;
  }

  async execute(email: string, employeeUpdateData: UpdateEmployeeDTO) {
    await this.repository.update(email, employeeUpdateData);
  }
}
