import MentorManager from "../mangers/MentorManager.js";

export default class MentorController {
  static async browse(req, res) {
    try {
      const { perPage, offset } = req.query;
      const result = await MentorManager.browse(perPage, offset);
      res.status(200).json(result);
    } catch (error) {
      res.status(401).json({ message: "Demande refusée" });
    }
  }

  static async read(req, res) {
    try {
      const { userId } = req.params;

      const result = await MentorManager.read(userId);
      res.status(200).json(result);
    } catch (error) {
      res.status(401).json({ message: "Demande refusée" });
    }
  }

  static async add(req, res) {
    try {
      const {
        firstname,
        lastname,
        title,
        description,
        imgUrl,
        githubUrl,
        linkedinUrl,
        userId,
      } = req.body;
      const result = await MentorManager.add(
        firstname,
        lastname,
        title,
        description,
        userId,
        imgUrl,
        githubUrl,
        linkedinUrl
      );
      res.status(201).json({ affectedRows: result.affectedRows });
    } catch (error) {
      res.status(401).json({ message: `Demande refusée: ${error.message}` });
    }
  }

  static async delete(req, res) {
    try {
      const { mentorId } = req.params;
      const connected = await MentorManager.read(mentorId);
      if (connected) {
        const result = await MentorManager.delete(mentorId);
        res.status(202).json({ affectedRows: result.affectedRows });
      } else
        res
          .status(401)
          .json({ message: `Demande refusée: Mauvais identifiant` });
    } catch (error) {
      res.status(401).json({ message: `Demande refusée: ${error.message}` });
    }
  }

  static async update(req, res) {
    try {
      const { userId } = req.params;
      const props = req.body;
      const result = await MentorManager.read(userId);
      if (result) {
        const affectedRows = await MentorManager.update(userId, props);
        res.status(202).json({ ...affectedRows });
      } else
        res
          .status(401)
          .json({ message: `Mise à jour refusée : Mauvais identifiants` });
    } catch (error) {
      res
        .status(401)
        .json({ message: `Mise à jour refusée : ${error.message}` });
    }
  }

  static async updateImage(req, res) {
    try {
      const { userId } = req.params;
      const result = await MentorManager.read(userId);
      if (result) {
        const affectedRows = await MentorManager.updateImage(
          userId,
          req.newPath
        );
        res.status(202).json({ ...affectedRows });
      } else
        res
          .status(401)
          .json({ message: `Mise à jour refusée : Mauvais identifiants` });
    } catch (error) {
      res
        .status(401)
        .json({ message: `Mise à jour refusée : ${error.message}` });
    }
  }
}
