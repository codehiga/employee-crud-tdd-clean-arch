import { Employee } from "@/entities/employee";
import { UpdateEmployeeDTO } from "@/entities/ports/dto/update-employee-dto";
import { InMemoryEmployeeRepository } from "./in-memory-employee-repository";

function getSut() {
  const employees: Employee[] = [];
  const repository = new InMemoryEmployeeRepository(employees);
  return {
    repository,
  };
}

describe("Tests InMemoryEmployeeRepository", () => {
  it("should persist a new employee", async () => {
    const { repository } = getSut();
    const newEmployee = Employee.create({
      name: "employee test",
      email: "employeetest@test.com",
      type: "employee",
    }).value as Employee;
    await repository.save(newEmployee);
    const employeeFromRepository = (
      await repository.findEmployeeByEmail(newEmployee.email)
    ).value as Employee;
    expect(employeeFromRepository.email).toBe(newEmployee.email);
  });

  it("should return a list of employees", async () => {
    const { repository } = getSut();
    const newEmployee1 = Employee.create({
      name: "employee test",
      email: "employeetest1@test.com",
      type: "employee",
    }).value as Employee;
    const newEmployee2 = Employee.create({
      name: "employee test",
      email: "employeetest2@test.com",
      type: "employee",
    }).value as Employee;
    const newEmployee3 = Employee.create({
      name: "employee test",
      email: "employeetest3@test.com",
      type: "employee",
    }).value as Employee;
    await repository.save(newEmployee1);
    await repository.save(newEmployee2);
    await repository.save(newEmployee3);
    const employees = (await (await repository.findAll()).value) as Employee[];
    expect(employees.length).toBe(3);
    expect(employees[2].email).toBe(newEmployee3.email);
  });

  it("should update a employee", async () => {
    const { repository } = getSut();
    const employee = Employee.create({
      email: "employee@test.com",
      name: "employee",
      type: "employee",
    }).value as Employee;
    await repository.save(employee);
    const updatedEmployeeData: UpdateEmployeeDTO = {
      email: "employee@test.com",
      name: "employee updated",
      type: "employee",
    };
    const updatedEmployee = (
      await repository.update(employee.email, updatedEmployeeData)
    ).value;
    expect(updatedEmployee).toEqual(updatedEmployeeData);
  });

  it("should not be able to update if not found employee", async () => {
    const { repository } = getSut();
    const updatedEmployeeNotExistData: UpdateEmployeeDTO = {
      email: "employee@test.com",
      name: "employee updated",
      type: "employee",
    };
    const error = (
      await repository.update(
        "employeenotexist@test.com",
        updatedEmployeeNotExistData
      )
    ).value as Error;
    expect(error.name).toBe("UserToUpdateNotFoundError");
    expect(error.message).toBe("Usuário não encontrado!");
  });

  it("should delete a employee by email", async () => {
    const { repository } = getSut();
    const employee = Employee.create({
      name: "employee test",
      email: "employeetest@test.com",
      type: "employee",
    }).value as Employee;
    await repository.save(employee);
    await repository.delete(employee.email);
    const list = (await (await repository.findAll()).value) as Employee[];
    expect(list.length).toBe(0);
  });
});
