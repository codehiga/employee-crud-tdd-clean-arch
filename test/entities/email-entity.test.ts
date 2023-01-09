import { Email } from "@/entities/email";
import { InvalidEmailError } from "@/entities/errors/invalid-email";

describe("EmailEntityTest", () => {
  it("should return email if email is valid", () => {
    const emailInput = "valid@email.com";
    const email = Email.create(emailInput).value as Email;
    expect(email.value).toBe(emailInput);
  });

  it("should return error if email is not valid", () => {
    const email = "invalid_email.com";
    const error = Email.create(email).value as InvalidEmailError;
    expect(error.message).toEqual("O email inserido é inválido!");
    expect(error.name).toEqual("InvalidEmailError");
  });

  it("should result be isLeft if email is not valid", () => {
    const email = "invalid_email.com";
    const error = Email.create(email);
    expect(error.isLeft()).toBeTruthy();
  });
});
