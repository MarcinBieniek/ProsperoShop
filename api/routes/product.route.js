import express from 'express';
import { createProduct, getAllProducts } from '../controllers/product.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/get', getAllProducts);
router.post('/create', verifyToken, createProduct);

export default router;