export default class SkillsManager {
  constructor(database) {
    this.database = database;
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
      const [skills] = await this.database.query(
        `SELECT skills.name, skills.id FROM skills
        INNER JOIN user_skills ON skills.id = user_skills.skillId
        WHERE user_skills.userId = ?`,
        [userId]
      );
      return skills;
    } catch (error) {
      throw error;
    }
  }

  async addSkill(skillName) {
    try {
      const [skill] = await this.database.query(
        `SELECT * FROM skills where name = ? `,
        [skillName]
      );

      if (skill.length > 0) {
        return { success: false, message: "Skill already exists" };
      }

      await this.database.query(`INSERT INTO skills (name) VALUES (?)`, [
        skillName,
      ]);

      return { success: true, message: "Skill added successfully" };
    } catch (error) {
      throw error;
    }
  }

  async editSkillsList(userId, skills) {
    try {
      // delete all languages for specific user

      const deleteUserSkills = await this.database.query(
        `delete from user_skills where userId = ?`,
        [userId]
      );
      const resultAddSkills = await Promise.all(
        skills.map(async (skill) => {
          const [res] = await this.database.query(
            `INSERT INTO user_skills (userId, skillId) VALUES (?, ? )`,
            [userId, skill.id]
          );
          return res.insertId;
        })
      );
      const skillsList = await this.getUserSkills(userId);

      return {
        success: true,
        message: "skills added successfully",
        skills: skillsList,
      };
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
