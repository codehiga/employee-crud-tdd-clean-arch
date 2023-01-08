import { UpdateEmployeeDTO } from "@/dto/update-employee-dto";
import { Either, left } from "@/shared/either";
import { Employee } from "./../entities/employee";
import { EmployeeRepository } from "./../ports/employee-repository";
import { DuplicatedEmailError } from "./errors/DuplicatedEmailError";

export class InMemoryEmployeeRepository implements EmployeeRepository {
  private repository: Employee[] = [];

  constructor(repository: Employee[]) {
    this.repository = repository;
  }

  async update(
    email: string,
    updatedEmployeeData: UpdateEmployeeDTO
  ): Promise<Employee> {
    const newRepo = [];
    this.repository.map((employee) => {
      return employee.email != email ? newRepo.push(employee) : "";
    });
    newRepo.push(updatedEmployeeData);
    this.repository = newRepo;
    console.log(this.repository);
    return updatedEmployeeData;
  }

  async findAll(): Promise<Employee[] | []> {
    return await this.repository;
  }

  async save(employee: Employee): Promise<Either<DuplicatedEmailError, void>> {
    if (await this.findEmployeeByEmail(employee.email)) {
      return left(new DuplicatedEmailError());
    }
    await this.repository.push(employee);
  }

  async findEmployeeByEmail(email: string): Promise<Employee | null> {
    const employee = await this.repository.find(
      (employee) => employee.email == email
    );
    if (!employee) return null;
    return employee;
  }
}
