import { Employee } from "@/entities/employee";
import { UpdateEmployeeDTO } from "@/entities/ports/dto/update-employee-dto";
import { DuplicatedEmailError } from "@/repository/errors/DuplicatedEmailError";
import { UserToUpdateNotFoundError } from "@/repository/errors/user-to-update-not-found-error";
import { EmployeeRepository } from "@/repository/ports/employee-repository";
import { Either, left, right } from "@/shared/either";

export class InMemoryEmployeeRepository implements EmployeeRepository {
  private repository: Employee[] = [];

  constructor(repository: Employee[]) {
    this.repository = repository;
  }

  async update(
    email: string,
    updatedEmployeeData: UpdateEmployeeDTO
  ): Promise<Either<UserToUpdateNotFoundError, Employee>> {
    const newRepo = [];
    const foundedUser = await this.findEmployeeByEmail(email);
    if (!foundedUser) {
      return left(new UserToUpdateNotFoundError());
    }
    this.repository.map((employee) => {
      return employee.email != email ? newRepo.push(employee) : "";
    });
    newRepo.push(updatedEmployeeData);
    this.repository = newRepo;
    return await right(updatedEmployeeData);
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

  async delete(email: string): Promise<void> {
    let tempList = [];
    this.repository.map((employee) => {
      if (employee.email !== email) {
        tempList.push(employee);
      }
    });
    this.repository = tempList;
  }
}
