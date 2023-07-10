import { register } from "./authSlice";

describe("register", () => {
  it("should successfully register a user", async () => {
    const data = {
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      password: "password123",
    };

    const response = await register(data);

    expect(response.status).toBe(200);
    expect(response.ok).toBe(true);

    const json = await response.json();

    expect(json.user).toBeDefined();
    expect(json.token).toBeDefined();
  });

  it("should reject with an error message if registration fails", async () => {
    const data = {
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      password: "password123",
    };

    const response = await register(data);

    expect(response.status).toBe(400);
    expect(response.ok).toBe(false);

    const message = await response.text();

    expect(message).toContain("User already exists");
  });
});