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
    const employeeOrError = Employee.create({
      email: "employee@test.com",
      name: "employee",
      type: "employee",
    });
    const employeeToReplaceOlderOrError = Employee.create({
      email: "employee@test.com",
      name: "employee updated",
      type: "employee",
    });
    if (employeeOrError.isRight() && employeeToReplaceOlderOrError.isRight()) {
      await createNewEmployeeUseCase.execute(employeeOrError.value);
      await updateEmployeeUseCase.execute(
        employeeOrError.value.email,
        employeeToReplaceOlderOrError.value
      );
    }
    const employeeFounded = await repository.findEmployeeByEmail(
      "employee@test.com"
    );
    expect(employeeFounded.name).toBe("employee updated");
  });

  it("should return error if employee email not exist", async () => {
    const employees: Employee[] = [];
    let repository = new InMemoryEmployeeRepository(employees);
    let updateEmployeeUseCase = new UpdateEmployee(repository);
    const employeeOrError = Employee.create({
      email: "employee@test.com",
      name: "employee",
      type: "employee",
    });
    let error: Error;
    if (employeeOrError.isRight()) {
      error = (
        await updateEmployeeUseCase.execute(
          "notexistemail@test.com",
          employeeOrError.value
        )
      ).value as Error;
    }
    expect(error.message).toBe("Usuário não encontrado!");
    expect(error.name).toBe("UserToUpdateNotFoundError");
  });
});
