import LanguageManager from "../mangers/LanguageManager.js";

export default class LanguagesController {
  constructor(database) {
    this.languageManager = new LanguageManager(database);
  }

  async getLanguages(req, res) {
    try {
      const result = await this.languageManager.getAllLanguages();
      res.json(result);
    } catch (error) {
      console.error(error.message);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }

  async getUsersLanguages(req, res) {
    try {
      const { id } = req.params;
      const result = await this.languageManager.getUserLanguages(id);
      res.json(result);
    } catch (error) {
      console.error(error.message);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }

  async addUserLanguage(req, res) {
    try {
      const { userId } = req.params;
      const { languageId } = req.body;

      const result = await this.languageManager.addUserLanguage(
        userId,
        languageId
      );
      res.json(result);
    } catch (error) {
      console.error(error.message);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }

  async editLanguagesList(req, res) {
    const { userId } = req.params;
    const data = req.body;

    try {
      const result = await this.languageManager.editLanguagesList(userId, data);
      res.json(result);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async addLanguage(req, res) {
    try {
      const { name } = req.body;
      const result = await this.languageManager.addLanguage(name);
      res.json(result);
    } catch (error) {
      console.error("Error adding skill:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }

  async deleteLanguage(req, res) {
    try {
      const { languageId } = req.params;
      const result = await this.languageManager.deleteLanguage(languageId);
      res.json(result);
    } catch (error) {
      console.error("Error deleting skill:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }

  async updateLanguage(req, res) {
    try {
      const { languageId } = req.params;
      const { name } = req.body;
      const result = await this.languageManager.updateLanguage(
        languageId,
        name
      );
      res.json(result);
    } catch (error) {
      console.error("Error updating skill:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
}
