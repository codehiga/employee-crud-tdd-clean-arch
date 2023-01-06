import { Email } from "../../../usecases/create-new-employee/entities/Email";

describe("Tests about create a employee with valid email", () => {
  it("should return false if email is not valid", () => {
    const email = "invalid_email.com";
    const response = Email.isValidEmail(email);
    expect(response).toBeFalsy();
  });

  it("should return false if email is not valid with whitespaces", () => {
    const email = "invalid email.com";
    const response = Email.isValidEmail(email);
    expect(response).toBeFalsy();
  });
});
