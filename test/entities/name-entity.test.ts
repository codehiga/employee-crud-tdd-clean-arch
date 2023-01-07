import { Name } from "@/entities/name";

describe("Test Name entity", () => {
  it("should be able to create a new valid Name", () => {
    const nameInput = "Valid Name";
    const name = Name.create(nameInput).value as Name;
    expect(name.value).toBe(nameInput);
  });

  it("shout not be able to create a new invalid Name", () => {
    const nameInput = "I    ";
    const error = Name.create(nameInput).value as Error;
    expect(error.message).toBe("Nome inserido é inválido!");
    expect(error.name).toBe("InvalidNameError");
  });
});
