import { Employee } from "@/entities/employee";
import { UpdateEmployeeDTO } from "@/entities/ports/dto/update-employee-dto";
import { Either } from "@/shared/either";
import { RepositoryError } from "../errors/repository-error";

export interface EmployeeRepository {
  save(newEmployee: Employee): Promise<Either<RepositoryError, Employee>>;
  findEmployeeByEmail(
    email: string
  ): Promise<Either<RepositoryError, Employee | null>>;
  findAll(): Promise<Either<RepositoryError, Employee[] | []>>;
  update(
    email: string,
    updatedEmployeeData: UpdateEmployeeDTO
  ): Promise<Either<RepositoryError, Employee | null>>;
  delete(email: string): Promise<Either<RepositoryError, void>>;
}
