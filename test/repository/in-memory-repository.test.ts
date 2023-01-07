import { Employee } from "@/entities/employee";
import { InMemoryEmployeeRepository } from "@/repository/in-memory-employee-repository";

function getSut() {
  const employees: Employee[] = [];
  const repository = new InMemoryEmployeeRepository(employees);
  return {
    repository,
  };
}

describe("Tests InMemoryEmployeeRepository", () => {
  it("should persist a new Employee", async () => {
    const { repository } = getSut();
    const newEmployee: Employee = Employee.create({
      name: "employee test",
      email: "employeetest@test.com",
      type: "employee",
    }).value as Employee;
    await repository.save(newEmployee);
    const employeeFromRepository = await repository.findEmployeeByEmail(
      newEmployee.email
    );
    expect(employeeFromRepository.email).toBe(newEmployee.email);
  });

  it("should not be able to inser same Employee two times", async () => {
    const { repository } = getSut();
    const newEmployee = Employee.create({
      name: "employee test",
      email: "employeetest@test.com",
      type: "employee",
    }).value as Employee;
    await repository.save(newEmployee);
    const saveSecondTimeError = (await repository.save(newEmployee))
      .value as Error;
    expect(saveSecondTimeError.name).toBe("DuplicatedEmailError");
    expect(saveSecondTimeError.message).toBe("Este e-mail já está cadastrado!");
  });

  it("should persist a new Employee", async () => {
    const { repository } = getSut();
    const emailNotExists = "notexistemail@test.com";
    const nullResult = await repository.findEmployeeByEmail(emailNotExists);
    expect(nullResult).toBeNull();
  });
});
