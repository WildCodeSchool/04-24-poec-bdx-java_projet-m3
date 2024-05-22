import FavoriteManager from "../mangers/FavoriteManager.js";

export default class FavoriteController {
  static async addFavorite(req, res) {
    try {
      const { mentorId, studentId } = req.body;

      const result = await FavoriteManager.addFavorite(studentId, mentorId);
      res.status(201).json(result);
    } catch (error) {
      res.status(401).json({ message: `Demande refusée: ${error.message}` });
    }
  }

  static async removeFavorite(req, res) {
    try {
      const { mentorId, studentId} = req.params;
      const result = await FavoriteManager.removeFavorite(studentId, mentorId);
      res.status(202).json(result);
    } catch (error) {
      res.status(401).json({ message: `Demande refusée: ${error.message}` });
    }
  }

  static async isFavorite(req, res) {
    try {
      const { studentId, mentorId } = req.params;
      const result = await FavoriteManager.isFavorite(studentId, mentorId);
      res.status(200).json(result);
    } catch (error) {
      res.status(401).json({ message: `Demande refusée: ${error.message}` });
    }
  }


  static async getUserFavorites(req, res) {
    try {
      const {studentId} = req.params;

      const result = await FavoriteManager.getUserFavorites(studentId);
      res.status(200).json(result);
    } catch (error) {
      res.status(401).json({ message: `Demande refusée: ${error.message}` });
    }
  }

  static async getMentorsFavoriteByStudent(req, res) {
    try {
      const { studentId } = req.params;
      const result = await FavoriteManager.getMentorsFavoriteByStudent(studentId);
      res.status(200).json(result);
    } catch (error) {
      res.status(401).json({ message: `Demande refusée: ${error.message}` });
    }
  }

}
