import { Employee } from "@/entities/employee";
import { EmployeeRepository } from "@/repository/ports/employee-repository";
import { ListEmployees } from "@/usecases/list-employees/list-employees";
import { InMemoryEmployeeRepository } from "@test/repository/in-memory-employee-repository";

describe("Test ListEmployee usecase", () => {
  let repository: EmployeeRepository;

  beforeAll(async () => {
    const employees: Employee[] = [];
    repository = new InMemoryEmployeeRepository(employees);
    const employeeOrError = Employee.create({
      email: "employee@test.com",
      name: "employee",
      type: "employee",
    });
    const employee2OrError = Employee.create({
      email: "employee2@test.com",
      name: "employee2",
      type: "employee2",
    });
    if (employeeOrError.isRight()) {
      await repository.save(employeeOrError.value);
    }
    if (employee2OrError.isRight()) {
      await repository.save(employee2OrError.value);
    }
  });

  it("should return all employees", async () => {
    const listEmployeesUseCase = new ListEmployees(repository);
    const result = (await (
      await listEmployeesUseCase.execute()
    ).value) as Employee[];
    expect(result.length).toBe(2);
    expect(result[0].email).toBe("employee@test.com");
  });
});
