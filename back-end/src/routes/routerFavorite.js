import express from "express";
import FavoriteController from '../controllers/FavoriteController.js';

const router = express.Router();

router.post('/add', FavoriteController.addFavorite);
router.delete('/remove/:studentId/:mentorId', FavoriteController.removeFavorite);
router.get('/:studentId/:mentorId', FavoriteController.isFavorite);

module.exports = router;