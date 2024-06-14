import express from "express";
import LanguageController from "../controllers/LanguageController.js";
import { client } from "../clientDb/client.js";

const router = express.Router();

const languageController = new LanguageController(client);
router.get("/languages", (req, res) => {
  languageController.getLanguages(req, res);
});

router.get("/languages/user/:id", (req, res) => {
  languageController.getUsersLanguages(req, res);
});

router.post("/languages", (req, res) => {
  languageController.addLanguage(req, res);
});

// router.post("/languages/user-single/:userId", (req, res) => {
//   languageController.addUserLanguage(req, res);
// });

router.post("/languages/user/:userId", (req, res) => {
  languageController.editLanguagesList(req, res);
});

router.delete("/languages/:languageId", (req, res) => {
  languageController.deleteLanguage(req, res);
});

router.put("/languages/:languageId", (req, res) => {
  languageController.updateLanguage(req, res);
});

export default router;
