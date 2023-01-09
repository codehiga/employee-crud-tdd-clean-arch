import { Employee } from "@/entities/employee";
import { UpdateEmployeeDTO } from "@/entities/ports/dto/update-employee-dto";
import { UserToUpdateNotFoundError } from "@/repository/errors/user-to-update-not-found-error";
import { Either } from "@/shared/either";
import { DuplicatedEmailError } from "../errors/duplicated-email-error";

export interface EmployeeRepository {
  save(newEmployee: Employee): Promise<Either<DuplicatedEmailError, Employee>>;
  findEmployeeByEmail(email: string): Promise<Employee | null>;
  findAll(): Promise<Employee[] | []>;
  update(
    email: string,
    updatedEmployeeData: UpdateEmployeeDTO
  ): Promise<Either<UserToUpdateNotFoundError, Employee>>;
  delete(email: string): Promise<void>;
}
