import { Employee } from "@/entities/employee";
import { NewEmployeeDTO } from "@/entities/ports/dto/new-employee-dto";

describe("Test Employee entity", () => {
  it("should return error if email is not valid on create a new Employee", () => {
    const newEmployeeWithInvalidEmail: NewEmployeeDTO = {
      name: "Employee",
      email: "invalidemail test.com",
      type: "employee",
    };
    const error = Employee.create(newEmployeeWithInvalidEmail).value as Error;
    expect(error.message).toBe("O email inserido é inválido!");
    expect(error.name).toBe("InvalidEmailError");
  });

  it("should return error if name is not valid on create a new Employee", () => {
    const newEmployeeWithInvalidName: NewEmployeeDTO = {
      name: "E",
      email: "employee@test.com",
      type: "employee",
    };
    const error = Employee.create(newEmployeeWithInvalidName).value as Error;
    expect(error.message).toBe("Nome inserido é inválido!");
    expect(error.name).toBe("InvalidNameError");
  });
});
