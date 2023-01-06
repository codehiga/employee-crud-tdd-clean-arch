import { NewEmployeeDTO } from "../../../usecases/create-new-employee/dto/newEmployeeDTO";
import { Employee } from "../../../usecases/create-new-employee/entities/Employee";

describe("Tests about usecase create new employee", () => {
  it("should create a new employee entity", async () => {
    const newEmployeeDTO: NewEmployeeDTO = {
      name: "Employee 1",
      email: "employee_1@test.com",
      type: "employee",
    };
    const employee = Employee.create(newEmployeeDTO);
    expect(employee).toBeInstanceOf(Employee);
  });

  it("should throw a error if email is not valid", () => {
    const newEmployeeDTO: NewEmployeeDTO = {
      name: "Invalid Email Employee",
      email: "invalidEmail test.com",
      type: "employee",
    };
    const employee = Employee.create(newEmployeeDTO);
    expect(employee).toBeFalsy();
  });
});
