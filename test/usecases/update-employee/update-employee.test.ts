import { Employee } from "@/entities/employee";
import { CreateNewEmployee } from "@/usecases/create-new-employee/create-new-employee.usecase";
import { UpdateEmployee } from "@/usecases/update-employee/update-employee";
import { InMemoryEmployeeRepository } from "@test/repository/in-memory-employee-repository";

describe("Update employee", () => {
  it("should update a employee", async () => {
    const employees: Employee[] = [];
    let repository = new InMemoryEmployeeRepository(employees);
    let createNewEmployeeUseCase = new CreateNewEmployee(repository);
    let updateEmployeeUseCase = new UpdateEmployee(repository);
    const employeeCreated = await createNewEmployeeUseCase.execute({
      email: "employee@test.com",
      name: "employee",
      type: "employee",
    });
    if (employeeCreated.isLeft()) {
      console.log(employeeCreated.value);
    }
    await updateEmployeeUseCase.execute("employee@test.com", {
      email: "employee@test.com",
      name: "employee updated",
      type: "employee",
    });
    const employeeFounded = (
      await repository.findEmployeeByEmail("employee@test.com")
    ).value as Employee;
    expect(employeeFounded.name).toBe("employee updated");
  });

  it("should return error if employee email not exist", async () => {
    const employees: Employee[] = [];
    let repository = new InMemoryEmployeeRepository(employees);
    let updateEmployeeUseCase = new UpdateEmployee(repository);
    let error = (
      await updateEmployeeUseCase.execute("notexistemail@test.com", {
        email: "employee@test.com",
        name: "employee",
        type: "employee",
      })
    ).value as Error;
    expect(error.message).toBe("Usuário não encontrado!");
    expect(error.name).toBe("UserToUpdateNotFoundError");
  });
});
