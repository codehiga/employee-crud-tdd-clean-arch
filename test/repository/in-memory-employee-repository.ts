import { Employee } from "@/entities/employee";
import { UpdateEmployeeDTO } from "@/entities/ports/dto/update-employee-dto";
import { RepositoryError } from "@/repository/errors/repository-error";
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
  ): Promise<Either<RepositoryError, Employee | null>> {
    try {
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
    } catch (e) {
      return left(new RepositoryError("Erro ao atualizar funcionário!"));
    }
  }

  async findAll(): Promise<Either<RepositoryError, Employee[] | []>> {
    try {
      return await right(this.repository);
    } catch (e) {
      return left(
        new RepositoryError("Erro ao resgatar todos os funcionários!")
      );
    }
  }

  async save(employee: Employee): Promise<Either<RepositoryError, Employee>> {
    try {
      await this.repository.push(employee);
      return right(employee);
    } catch (e) {
      return left(new RepositoryError("Erro ao salvar funcionário!"));
    }
  }

  async findEmployeeByEmail(
    email: string
  ): Promise<Either<RepositoryError, Employee | null>> {
    try {
      const employee = await this.repository.find(
        (employee) => employee.email == email
      );
      if (!employee) return null;
      return right(employee);
    } catch (e) {
      return left(
        new RepositoryError("Erro ao resgatar funcionário pelo email: " + email)
      );
    }
  }

  async delete(email: string): Promise<Either<RepositoryError, void>> {
    try {
      let tempList = [];
      this.repository.map((employee) => {
        if (employee.email !== email) {
          tempList.push(employee);
        }
      });
      this.repository = tempList;
    } catch (e) {
      return left(new RepositoryError("Erro ao deletar funcionário: " + email));
    }
  }
}
