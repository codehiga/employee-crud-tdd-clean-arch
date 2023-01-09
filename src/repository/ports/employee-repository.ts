import { Employee } from "@/entities/employee";
import { UpdateEmployeeDTO } from "@/entities/ports/dto/update-employee-dto";
import { DuplicatedEmailError } from "@/repository/errors/DuplicatedEmailError";
import { UserToUpdateNotFoundError } from "@/repository/errors/user-to-update-not-found-error";
import { Either } from "@/shared/either";

export interface EmployeeRepository {
  save(newEmployee: Employee): Promise<Either<DuplicatedEmailError, void>>;
  findEmployeeByEmail(email: string): Promise<Employee | null>;
  findAll(): Promise<Employee[] | []>;
  update(
    email: string,
    updatedEmployeeData: UpdateEmployeeDTO
  ): Promise<Either<UserToUpdateNotFoundError, Employee>>;
  delete(email: string): Promise<void>;
}
