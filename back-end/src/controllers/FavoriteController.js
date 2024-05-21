import FavoriteManager from "../managers/FavoriteManager.js";

export default class FavoriteController {
  static async addFavorite(req, res) {
    try {
      const { mentorId } = req.body;
      const studentId = req.user.id; // Assumes you have user authentication in place

      const result = await FavoriteManager.addFavorite(studentId, mentorId);
      res.status(201).json(result);
    } catch (error) {
      res.status(401).json({ message: `Demande refusée: ${error.message}` });
    }
  }

  static async removeFavorite(req, res) {
    try {
      const { mentorId } = req.params;
      const studentId = req.user.id;

      const result = await FavoriteManager.removeFavorite(studentId, mentorId);
      res.status(202).json(result);
    } catch (error) {
      res.status(401).json({ message: `Demande refusée: ${error.message}` });
    }
  }

  static async isFavorite(req, res) {
    try {
      const { mentorId } = req.params;
      const studentId = req.user.id;

      const result = await FavoriteManager.isFavorite(studentId, mentorId);
      res.status(200).json({ isFavorite: result });
    } catch (error) {
      res.status(401).json({ message: `Demande refusée: ${error.message}` });
    }
  }

  static async getUserFavorites(req, res) {
    try {
      const studentId = req.user.id;

      const result = await FavoriteManager.getUserFavorites(studentId);
      res.status(200).json(result);
    } catch (error) {
      res.status(401).json({ message: `Demande refusée: ${error.message}` });
    }
  }
}
