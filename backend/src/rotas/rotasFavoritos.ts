import express from 'express';
import { addFavorite, getFavorites } from '../controle/favoritosControler';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/add', authenticateToken, addFavorite);
router.get('/', authenticateToken, getFavorites);

export default router;
