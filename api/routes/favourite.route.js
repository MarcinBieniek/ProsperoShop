import express from 'express';
import { toggleFavourite, getFavourites } from '../controllers/favourite.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/get', getFavourites);
router.post('/', verifyToken, toggleFavourite);

export default router;