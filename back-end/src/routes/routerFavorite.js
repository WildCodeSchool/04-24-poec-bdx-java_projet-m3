import express from "express";
import FavoriteController from '../controllers/FavoriteController.js';

const router = express.Router();

router.post('/add', FavoriteController.addFavorite);
router.delete('/remove/:studentId(\\d+)/:mentorId(\\d+)', FavoriteController.removeFavorite);
router.get('/:studentId(\\d+)/:mentorId(\\d+)', FavoriteController.isFavorite);
router.get('/:studentId(\\d+)', FavoriteController.getUserFavorites);
router.get('/mentors/:studentId(\\d+)', FavoriteController.getMentorsFavoriteByStudent);


export default router;