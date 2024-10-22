import express from 'express';
import { createProduct, getAllProducts } from '../controllers/product.controller.js';

const router = express.Router();

router.get('/get', getAllProducts);
router.post('/create', createProduct);

export default router;