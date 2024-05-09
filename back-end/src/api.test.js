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
describe("GET /users", () => {
  const email = "mahdi.mcheik@hotmail.fr";
  it("should return all users", async () => {
    await api
      .get(`/users`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});

describe("GET /users", () => {
  const email = "mahdi.mcheik@hotmail.fr";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1haGRpLm1jaGVpa0Bob3RtYWlsLmZyIiwiZmlyc3RuYW1lIjoiTWFoZGkiLCJsYXN0bmFtZSI6Ik1jaGVpayIsImlhdCI6MTcwOTg0NjE0MSwiZXhwIjoxNzA5ODgyMTQxfQ.FOd2U2PMuIiCU3jXZcqyjf9VcPWAqTD4tJZqc3brSQE";
  it("should return all users", async () => {
    await api
      .get(`/users/${email}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});

describe("GET /users", () => {
  const email = "mahdi.mcheik@hotmail.fr";
  const token = "";
  it("should return single user", async () => {
    await api
      .get(`/users/${email}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(401)
      .expect("Content-Type", /application\/json/);
  });
});
describe("GET /users", () => {
  const email = "mahdi.mcheik@hotmail.fr";
  const password = "Olitec1@";
  it("should return user and token", async () => {
    await api
      .get(`/users/${email}/${password}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});
describe("GET /users", () => {
  const email = "mahdi.mcheik@hotmail.fr";
  const password = "Olitec@";
  it("should return user and token", async () => {
    await api
      .get(`/users/${email}/${password}`)
      .expect(404)
      .expect("Content-Type", /application\/json/);
  });
});

// describe("POST /users", () => {
//   const user = {
//     email: "mahdi.mcheik@hotmail.com",
//     password: "Olitec2@",
//     firstname: "Mahdito",
//     lastname: "mcheik",
//   };
//   it("should add user and get affected rows  = 1", async () => {
//     await api
//       .post(`/users`)
//       .send(user)
//       .expect(401)
//       .expect("Content-Type", /application\/json/);
//   });
// });
describe("POST /users", () => {
  const user = {
    email: `${Date.now()}@hotmail.com`,
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
      password: "$2b$10$BlBosHlCjAbNggkwlsQqr.DI84z9yZUwx8AWDS6esGkKAZyi5mgD2",
    });
  });
});

// describe("userManager read", () => {
//   it("should return all users ", async () => {
//     const email = "mahdi.mcheik@hotmail.fr";
//     const result = await UserManager.browse();
//     expect(result.length === 1).toBe(true);
//   });
// });
