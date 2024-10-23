import express from 'express';
import { createProduct, getAllProducts, deleteProduct } from '../controllers/product.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/get', getAllProducts);
router.post('/create', verifyToken, createProduct);
router.delete('/delete/:id', verifyToken, deleteProduct);

export default router;