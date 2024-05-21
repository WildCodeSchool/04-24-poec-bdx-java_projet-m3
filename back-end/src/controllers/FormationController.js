import FormationManager from "../mangers/FormationManager.js";

export default class FormationController {
  static async getAllFormations(req, res) {
    try {
      const result = await FormationManager.getAllFormations();
      res.status(200).json(result);
    } catch (error) {
      res.status(401).json({ message: "Demande refusée" });
    }
  }

  static async getUserFormations(req, res) {
    try {
      const { userId } = req.params;
      const result = await FormationManager.getUserFormations(userId);
      res.status(200).json(result);
    } catch (error) {
      res.status(401).json({ message: "Demande refusée" });
    }
  }

  static async add(req, res) {
    try {
      const { title, company, dateBegin, dateEnd, city, country, userId } =
        req.body;
      const result = await FormationManager.addFormation(
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
      const { formationId, userId } = req.params;

      const result = await FormationManager.deleteFormation(
        formationId,
        userId
      );
      res.status(202).json({ ...result });
    } catch (error) {
      res.status(401).json({ message: `Demande refusée: ${error.message}` });
    }
  }

  static async update(req, res) {
    try {
      const { formationId } = req.params;
      const props = req.body;
      const affectedRows = await FormationManager.updateFormation(
        formationId,
        props
      );
      res.status(202).json({ ...affectedRows, success: true });
    } catch (error) {
      res
        .status(401)
        .json({ message: `Mise à jour refusée : ${error.message}` });
    }
  }
}
