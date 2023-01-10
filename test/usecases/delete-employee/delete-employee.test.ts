import { Employee } from "@/entities/employee";
import { NewEmployeeDTO } from "@/entities/ports/dto/new-employee-dto";
import { CreateNewEmployee } from "@/usecases/create-new-employee/create-new-employee.usecase";
import { DeleteEmployee } from "@/usecases/delete-employee/delete-employee";
import { ListEmployees } from "@/usecases/list-employees/list-employees";
import { InMemoryEmployeeRepository } from "@test/repository/in-memory-employee-repository";

describe("Test ListEmployee usecase", () => {
  it("should delete employee by email", async () => {
    const employees: Employee[] = [];
    const repository = new InMemoryEmployeeRepository(employees);
    const newEmployee: NewEmployeeDTO = {
      name: "Employee 1",
      email: "employee1@test.com",
      type: "employee",
    };
    const createNewEmployee = new CreateNewEmployee(repository);
    await createNewEmployee.execute({
      email: newEmployee.email,
      name: newEmployee.name,
      type: newEmployee.type,
    });
    const deleteEmployeeUseCase = new DeleteEmployee(repository);
    await deleteEmployeeUseCase.execute(newEmployee.email);
    const listEmployeesUseCase = new ListEmployees(repository);
    const list = (await listEmployeesUseCase.execute()).value as Employee[];
    expect(list.length).toBe(0);
  });
});
