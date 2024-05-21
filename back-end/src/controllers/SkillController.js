import SkillsManager from "../mangers/SkillManager.js";

export default class SkillsController {
  constructor(database) {
    this.skillsManager = new SkillsManager(database);
  }

  async getSkills(req, res) {
    try {
      const result = await this.skillsManager.getAllSkills();
      res.json(result);
    } catch (error) {
      console.error(error.message);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }

  async getUsersSkills(req, res) {
    try {
      const { id } = req.params;
      const result = await this.skillsManager.getUserSkills(id);
      res.json(result);
    } catch (error) {
      console.error(error.message);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }

  async addSkill(req, res) {
    try {
      const { name } = req.body;
      const result = await this.skillsManager.addSkill(name);
      res.json(result);
    } catch (error) {
      console.error("Error adding skill:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }

  async addUserSkill(req, res) {
    try {
      const { userId } = req.params;
      const { skillId } = req.body;

      const result = await this.skillsManager.addUserSkill(userId, skillId);
      res.json(result);
    } catch (error) {
      console.error(error.message);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }

  async editSkillsList(req, res) {
    const { userId } = req.params;
    const data = req.body;

    try {
      const result = await this.skillsManager.editSkillsList(userId, data);
      res.json(result);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteSkill(req, res) {
    try {
      const { skillId } = req.params;
      const result = await this.skillsManager.deleteSkill(skillId);
      res.json(result);
    } catch (error) {
      console.error("Error deleting skill:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }

  async updateSkill(req, res) {
    try {
      const { skillId } = req.params;
      const { name } = req.body;
      const result = await this.skillsManager.updateSkill(skillId, name);
      res.json(result);
    } catch (error) {
      console.error("Error updating skill:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
}
