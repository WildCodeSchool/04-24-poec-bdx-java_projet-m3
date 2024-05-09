import supertest from "supertest";
import app from "./app.js";
import UserManager from "./mangers/UserManager.js";
import { expect, jest, test } from "@jest/globals";
const api = supertest(app);

test("GET call", async () => {
  await api
    .get("/users")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

describe("userManager browse", () => {
  it("should return all users ", async () => {
    const req = { body: {} };
    const res = {};
    const result = await UserManager.browse();
    expect(result.length > 0).toBe(true);
    expect(result).toContainEqual({
      email: "mahdi.mcheik@hotmail.fr",
      firstname: "Mahdi",
      lastname: "Mcheik",
      password: "$2b$10$zychaXOCZqRKvyLHj3bvce2jqxyEdaZDHoZWr2yDl9RhPGgPcOzLC",
    });
  });
});

describe("userManager login", () => {
  it("should return all users ", async () => {
    const email = "mahdi.mcheik@hotmail.fr";
    const password = "Olitec1@";
    const result = await UserManager.login(email, password);
    expect(result).toEqual({
      email: "mahdi.mcheik@hotmail.fr",
      firstname: "Mahdi",
      lastname: "Mcheik",
    });
  });
});
describe("userManager read", () => {
  it("should return all users ", async () => {
    const email = "mahdi.mcheik@hotmail.fr";
    const result = await UserManager.read(email);
    expect(result).toEqual({
      email: "mahdi.mcheik@hotmail.fr",
      firstname: "Mahdi",
      lastname: "Mcheik",
      password: "$2b$10$BlBosHlCjAbNggkwlsQqr.DI84z9yZUwx8AWDS6esGkKAZyi5mgD2",
    });
  });
});

describe("POST /users", () => {
  const user = {
    email: `mahdi.mcheik125@hotmail.com`,
    password: "Olitec2@",
    firstname: "Mahdi",
    lastname: "Mcheik",
  };
  it("should add user and get affected rows  = 1", async () => {
    await api
      .post(`/users`)
      .send(user)
      .expect(201)
      .expect("Content-Type", /application\/json/);
  });
});

describe("userManager delete", () => {
  it("should return all users ", async () => {
    const email = "mahdi.mcheik125@hotmail.com";
    const result = await UserManager.delete(email);
    expect(result.affectedRows).toEqual(1);
  });
});
