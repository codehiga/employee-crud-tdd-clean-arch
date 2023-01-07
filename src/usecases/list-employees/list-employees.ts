import { EmployeeRepository } from "@/ports/employee-repository";

export class ListEmployees {
  private readonly repository: EmployeeRepository;

  constructor(repository: EmployeeRepository) {
    this.repository = repository;
  }

  async execute() {
    const employees = await this.repository.findAll();
    return employees;
  }
}
