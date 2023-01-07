import { NewEmployeeDTO } from "./../../src/dto/newEmployeeDTO";
import { Employee } from "./../../src/entities/Employee";
import { InMemoryEmployeeRepository } from "./../../src/repository/in-memory-employee-repository";

describe("Tests about InMemoryEmployeeRepository", () => {
  it("should persist a new Employee", async () => {
    const employees: Employee[] = [];
    const repository = new InMemoryEmployeeRepository(employees);
    const newEmployee: NewEmployeeDTO = {
      name: "employee test",
      email: "employeetest@test.com",
      type: "employee",
    };
    await repository.save(newEmployee);
    const employeeFromRepository = await repository.findEmployeeByEmail(
      newEmployee.email
    );
    expect(employeeFromRepository.name).toBe(newEmployee.name);
  });
});
