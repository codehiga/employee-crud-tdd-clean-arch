import { NewEmployeeDTO } from "@/dto/newEmployeeDTO";
import { Employee } from "./../entities/Employee";
import { EmployeeRepository } from "./../ports/employee-repository";

export class InMemoryEmployeeRepository implements EmployeeRepository {
  private repository: Employee[] = [];

  constructor(repository: Employee[]) {
    this.repository = repository;
  }

  async save({ email, name, type }: NewEmployeeDTO): Promise<void> {
    const employee = Employee.create({
      email,
      name,
      type,
    });
    await this.repository.push(employee);
  }

  async findEmployeeByEmail(email: string): Promise<Employee> {
    return await this.repository.find(
      (employee) => employee.email.value == email
    );
  }
}
