import ExperienceManager from "../mangers/ExperienceManager.js";

export default class ExperienceController {
  static async getAllExperiences(req, res) {
    try {
      const result = await ExperienceManager.getAllExperiences();
      res.status(200).json(result);
    } catch (error) {
      res.status(401).json({ message: "Demande refusée" });
    }
  }

  static async getUserExperiences(req, res) {
    try {
      const { userId } = req.params;
      const result = await ExperienceManager.getUserExperiences(userId);
      res.status(200).json(result);
    } catch (error) {
      res.status(401).json({ message: "Demande refusée" });
    }
  }

  static async add(req, res) {
    try {
      const { title, company, dateBegin, dateEnd, city, country, userId } =
        req.body;
      const result = await ExperienceManager.addExperience(
        title,
        company,
        dateBegin,
        dateEnd,
        city,
        country,
        userId
      );
      res.status(201).json({ ...result });
    } catch (error) {
      res.status(401).json({ message: `Demande refusée: ${error.message}` });
    }
  }

  static async delete(req, res) {
    try {
      const { experienceId, userId } = req.params;

      const result = await ExperienceManager.deleteExperience(
        experienceId,
        userId
      );
      res.status(202).json({ ...result });
    } catch (error) {
      res.status(401).json({ message: `Demande refusée: ${error.message}` });
    }
  }

  static async update(req, res) {
    try {
      const { experienceId } = req.params;

      const props = req.body;
      const affectedRows = await ExperienceManager.updateExperience(
        experienceId,
        props
      );
      res.status(202).json({ ...affectedRows });
    } catch (error) {
      res
        .status(401)
        .json({ message: `Mise à jour refusée : ${error.message}` });
    }
  }
}
