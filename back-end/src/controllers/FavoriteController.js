export default class FavoriteController {
  
  static async addToFavorites(req, res) {
    try {
      const { mentorId } = req.body;
      res.status(201).json({ message: 'Mentor ajouté aux favoris avec succès' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de l\'ajout du mentor aux favoris' });
    }
  }
}