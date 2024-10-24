import express from 'express';
import { createProduct, getAllProducts, deleteProduct, updateProduct, getProduct } from '../controllers/product.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/get', getAllProducts);
router.get('/:id', getProduct);
router.post('/create', verifyToken, createProduct);
router.post('/update/:id', verifyToken, updateProduct);
router.delete('/delete/:id', verifyToken, deleteProduct);

export default router;