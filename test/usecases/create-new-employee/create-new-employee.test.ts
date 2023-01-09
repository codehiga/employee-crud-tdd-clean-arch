import { NewEmployeeDTO } from "@/dto/new-employee-dto";
import { Employee } from "@/entities/employee";
import { CreateNewEmployee } from "@/usecases/create-new-employee/create-new-employee.usecase";
import { InMemoryEmployeeRepository } from "@test/repository/in-memory-employee-repository";

describe("Tests about usecase create new employee", () => {
  it("should create a new Employee with usecase execute", async () => {
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
    const employeeFromRepository = await repository.findEmployeeByEmail(
      newEmployee.email
    );
    expect(employeeFromRepository).toEqual(newEmployee);
  });

  it("should not create a new Employee without name", async () => {
    const employees: Employee[] = [];
    const repository = new InMemoryEmployeeRepository(employees);
    const newEmployee: NewEmployeeDTO = {
      name: "",
      email: "employee1@test.com",
      type: "employee",
    };
    const createNewEmployee = new CreateNewEmployee(repository);
    const executeUseCase = (
      await createNewEmployee.execute({
        email: newEmployee.email,
        name: newEmployee.name,
        type: newEmployee.type,
      })
    ).value as Error;
    expect(executeUseCase.message).toBe("Nome inserido é inválido!");
    expect(executeUseCase.name).toBe("InvalidNameError");
  });

  it("should not create a new Employee with invalid email", async () => {
    const employees: Employee[] = [];
    const repository = new InMemoryEmployeeRepository(employees);
    const newEmployee: NewEmployeeDTO = {
      name: "Employee",
      email: "invalid_mail test.com",
      type: "employee",
    };
    const createNewEmployee = new CreateNewEmployee(repository);
    const executeUseCase = (
      await createNewEmployee.execute({
        email: newEmployee.email,
        name: newEmployee.name,
        type: newEmployee.type,
      })
    ).value as Error;
    expect(executeUseCase.message).toBe("O email inserido é inválido!");
    expect(executeUseCase.name).toBe("InvalidEmailError");
  });
});
