import express from "express";
import favoritesController from "../controllers/FavoriteController.js";

const router = express.Router();

router.post('/add', favoritesController.addToFavorites);
router.delete('/remove/:mentorId', favoritesController.removeFromFavorites);

module.exports = router;