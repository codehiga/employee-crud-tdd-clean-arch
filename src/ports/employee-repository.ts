import { Employee } from "@/entities/employee";
import { DuplicatedEmailError } from "@/repository/errors/DuplicatedEmailError";
import { Either } from "@/shared/either";

export interface EmployeeRepository {
  save(newEmployee: Employee): Promise<Either<DuplicatedEmailError, void>>;
  findEmployeeByEmail(email: string): Promise<Employee | null>;
  findAll(): Promise<Employee[] | []>;
}
