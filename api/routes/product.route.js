import express from 'express';
import { getAllProducts } from '../controllers/product.controller.js';

const router = express.Router();

router.get('/get', getAllProducts);

export default router;