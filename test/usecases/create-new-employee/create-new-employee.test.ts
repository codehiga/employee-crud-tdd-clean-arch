import { NewEmployeeDTO } from "./../../../src/dto/new-employee-dto";
import { Employee } from "./../../../src/entities/employee";
import { CreateNewEmployee } from "./../../../src/usecases/create-new-employee/create-new-employee.usecase";

describe("Tests about usecase create new employee", () => {
  it("should create a new employee entity", async () => {
    const newEmployeeDTO: NewEmployeeDTO = {
      name: "Employee 1",
      email: "employee_1@test.com",
      type: "employee",
    };
    const employee = Employee.create(newEmployeeDTO);
    expect(newEmployeeDTO.name).toBe(employee.name);
  });

  it("should return null if email is not valid on create a new EMPLOYEE", () => {
    const newEmployeeDTO: NewEmployeeDTO = {
      name: "Invalid Email Employee",
      email: "invalidEmail test.com",
      type: "employee",
    };
    const employee = Employee.create(newEmployeeDTO);
    expect(employee).toBeNull();
  });

  it("should create a new Employee", () => {
    const newEmployeeDTO: NewEmployeeDTO = {
      name: "Employee 1",
      email: "employee_1@test.com",
      type: "employee",
    };
    const employee = Employee.create(newEmployeeDTO);
    const createNewEmployee = new CreateNewEmployee();
    createNewEmployee.execute(employee);
  });
});
