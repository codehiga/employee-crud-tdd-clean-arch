import { EmployeeRepository } from "@/repository/ports/employee-repository";

export class DeleteEmployee {
  private readonly repository: EmployeeRepository;

  constructor(repository: EmployeeRepository) {
    this.repository = repository;
  }

  async execute(email: string) {
    return await this.repository.delete(email);
  }
}
