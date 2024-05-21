export default class LanguageManager {
  constructor(database) {
    this.database = database;
  }

  async getAllLanguages() {
    try {
      const [Languages] = await this.database.query(`SELECT * FROM languages`);
      return Languages;
    } catch (error) {
      throw error;
    }
  }

  async getUserLanguages(userId) {
    try {
      const [languages] = await this.database.query(
        `SELECT languages.name, languages.id FROM languages
          INNER JOIN user_languages ON languages.id = user_languages.languageId
          WHERE user_languages.userId = ?`,
        [userId]
      );
      return languages;
    } catch (error) {
      throw error;
    }
  }

  async addLanguage(name) {
    try {
      const [language] = await this.database.query(
        `SELECT * FROM languages where name = ? `,
        [name]
      );

      if (language.length > 0) {
        return { success: false, message: "language already exists" };
      }

      await this.database.query(`INSERT INTO languages (name) VALUES (?)`, [
        name,
      ]);

      return { success: true, message: "language added successfully" };
    } catch (error) {
      throw error;
    }
  }

  async editLanguagesList(userId, languages) {
    try {
      // delete all languages for specific user

      const deleteUserLanguages = await this.database.query(
        `delete from user_languages where userId = ?`,
        [userId]
      );
      const resultAddLanguagues = await Promise.all(
        languages.map(async (language) => {
          const [res] = await this.database.query(
            `INSERT INTO user_languages (userId, languageId) VALUES (?, ? )`,
            [userId, language.id]
          );
          return res.insertId;
        })
      );
      const languagesList = await this.getUserLanguages(userId);

      return {
        success: true,
        message: "languages added successfully",
        languages: languagesList,
      };
    } catch (error) {
      throw error;
    }
  }

  async addUserLanguage(userId, languageId) {
    try {
      const [language] = await this.database.query(
        `SELECT * FROM languages where id =  ? `,
        [languageId]
      );

      const [user] = await this.database.query(
        `SELECT * FROM users where id = ? `,
        [userId]
      );

      if (language.length === 0 || user.length === 0) {
        return { success: false, message: "language already exists" };
      } else {
        const [userLanguage] = await this.database.query(
          `SELECT * FROM user_languages where userId = ? and languageId = ? `,
          [userId, languageId]
        );
        if (userLanguage.length !== 0) {
          return { success: false, message: "language already exists" };
        }

        await this.database.query(
          `INSERT INTO user_languages (userId, languageId) VALUES (?, ?)`,
          [userId, languageId]
        );

        return { success: true, message: "language added successfully" };
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteLanguage(id) {
    try {
      await this.database.query(`DELETE FROM languages WHERE id = ?`, [id]);

      return { success: true, message: "language deleted successfully" };
    } catch (error) {
      throw error;
    }
  }

  async updateLanguage(id, name) {
    try {
      await this.database.query(`UPDATE languages SET name = ? WHERE id = ?`, [
        name,
        id,
      ]);

      return { success: true, message: "language updated successfully" };
    } catch (error) {
      throw error;
    }
  }
}
