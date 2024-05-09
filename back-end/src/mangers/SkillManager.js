export default class SkillsManager {
  constructor(database) {
    this.database = database; // Supposons que tu as une instance de connexion à la base de données injectée dans le gestionnaire.
  }

  async getAllSkills() {
    try {
      const [skills] = await this.database.query(`SELECT * FROM skills`);
      return skills;
    } catch (error) {
      throw error;
    }
  }

  async getUserSkills(userId) {
    try {
      // Supposons que tu utilises un ORM ou une bibliothèque de requêtes SQL comme Sequelize ou Knex.js.
      // Ici, nous supposons que tu utilises une requête SQL pour récupérer les skills d'un utilisateur par son ID.
      const [skills] = await this.database.query(
        `SELECT skills.name, skills.id FROM skills
        INNER JOIN user_skills ON skills.id = user_skills.skillId
        WHERE user_skills.userId = ?`,
        [userId]
      );
      return skills;
    } catch (error) {
      // Gérer les erreurs, par exemple en les lançant à la couche de contrôleur pour les traiter.
      throw error;
    }
  }

  async addSkill(skillName) {
    try {
      console.log("skill", skillName);
      // Vérifier si le skill existe déjà dans la base de données
      const [skill] = await this.database.query(
        `SELECT * FROM skills where name = ? `,
        [skillName]
      );

      // Si le skill existe déjà, on ne l'ajoute pas à nouveau
      if (skill.length > 0) {
        return { success: false, message: "Skill already exists" };
      }

      // Sinon, on ajoute le nouveau skill dans la base de données
      await this.database.query(`INSERT INTO skills (name) VALUES (?)`, [
        skillName,
      ]);

      return { success: true, message: "Skill added successfully" };
    } catch (error) {
      throw error;
    }
  }

  async addUserSkill(userId, skillId) {
    try {
      const [language] = await this.database.query(
        `SELECT * FROM skills where id = ? `,
        [skillId]
      );

      const [user] = await this.database.query(
        `SELECT * FROM users where id = ? `,
        [userId]
      );

      if (language.length === 0 || user.length === 0) {
        return { success: false, message: "skill already exists" };
      } else {
        const [userSkill] = await this.database.query(
          `SELECT * FROM user_skills where userId = ? and skillId = ? `,
          [userId, skillId]
        );
        if (userSkill.length !== 0) {
          return { success: false, message: "Skill already exists" };
        }

        await this.database.query(
          `INSERT INTO user_skills (userId, skillId) VALUES (?, ?)`,
          [userId, skillId]
        );

        return { success: true, message: "Skill added successfully" };
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteSkill(skillId) {
    try {
      // Supprimer le skill de la table des skills
      await this.database.query(`DELETE FROM skills WHERE id = ?`, [skillId]);

      return { success: true, message: "Skill deleted successfully" };
    } catch (error) {
      throw error;
    }
  }

  async updateSkill(skillId, newName) {
    try {
      console.log("name ", newName);
      // Mettre à jour le nom du skill dans la table des skills
      await this.database.query(`UPDATE skills SET name = ? WHERE id = ?`, [
        newName,
        skillId,
      ]);

      return { success: true, message: "Skill updated successfully" };
    } catch (error) {
      throw error;
    }
  }
}
