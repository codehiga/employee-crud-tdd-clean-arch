import { Employee } from "@/entities/employee";
import { CreateNewEmployee } from "@/usecases/create-new-employee/create-new-employee.usecase";
import { UpdateEmployee } from "@/usecases/update-employee/update-employee";
import { InMemoryEmployeeRepository } from "@test/repository/in-memory-employee-repository";

describe("Update employee", () => {
  it("should update a employee", async () => {
    const employees: Employee[] = [];
    let repository = new InMemoryEmployeeRepository(employees);
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
    let createNewEmployeeUseCase = new CreateNewEmployee(repository);
    let updateEmployeeUseCase = new UpdateEmployee(repository);
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
});
