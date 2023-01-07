import { NewEmployeeDTO } from "./../dto/newEmployeeDTO";
import { Employee } from "./../entities/Employee";

export interface EmployeeRepository {
  save(newEmployee: NewEmployeeDTO): Promise<void>;
  findEmployeeByEmail(email: string): Promise<Employee>;
}
