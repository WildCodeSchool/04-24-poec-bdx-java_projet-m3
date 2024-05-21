import { client } from "../clientDb/client.js";

export default class FavoriteManager {
  static async addFavorite(studentId, mentorId) {
    try {
      // Vérifier si le favori existe déjà
      const [favorite] = await client.query(
        `SELECT * FROM favorite_mentor_student WHERE studentId = ? AND mentorId = ?`,
        [studentId, mentorId]
      );

      if (favorite.length) {
        return { success: false, message: "Mentor is already in favorites" };
      }

      // Ajouter le favori
      await client.query(
        `INSERT INTO favorite_mentor_student (studentId, mentorId) VALUES (?, ?)`,
        [studentId, mentorId]
      );

      return { success: true, message: "Mentor added to favorites successfully" };
    } catch (error) {
      throw error;
    }
  }

  static async removeFavorite(studentId, mentorId) {
    try {
      await client.query(
        `DELETE FROM favorite_mentor_student WHERE studentId = ? AND mentorId = ?`,
        [studentId, mentorId]
      );
      return { success: true, message: "Mentor removed from favorites successfully" };
    } catch (error) {
      throw error;
    }
  }

  static async isFavorite(studentId, mentorId) {
    try {
      const [favorite] = await client.query(
        `SELECT * FROM favorite_mentor_student WHERE studentId = ? AND mentorId = ?`,
        [studentId, mentorId]
      );
      return favorite.length > 0;
    } catch (error) {
      throw error;
    }
  }

  static async getUserFavorites(studentId) {
    try {
      const [favorites] = await client.query(
        `SELECT * FROM favorite_mentor_student WHERE studentId = ?`,
        [studentId]
      );
      return favorites;
    } catch (error) {
      throw error;
    }
  }

}
