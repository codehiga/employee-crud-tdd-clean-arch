import { NewEmployeeDTO } from "@/dto/new-employee-dto";
import { Employee } from "@/entities/employee";

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
});
