import express from "express";
import UserController from "../controllers/UserController.js";
import Authentification from "../middlewares/Authentification.js";

const route = express.Router();

route.get("/users", UserController.browse);
route.get(
  "/users/getprofile",
  Authentification.authenticate,
  UserController.getProfile
);
route.post("/users/me", UserController.getUserByToken);
route.get("/users/:email", UserController.read);
route.get("/users/:email/:password", UserController.login);
route.post("/users", UserController.add);
route.delete(
  "/users/:password",
  Authentification.authenticate,
  UserController.delete
);
route.patch("/users", Authentification.authenticate, UserController.update);

export default route;
