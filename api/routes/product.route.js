import express from 'express';
import { createProduct, getAllProducts } from '../controllers/product.controller.js';
import { deleteUser } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/get', getAllProducts);
router.post('/create', createProduct);
router.delete('/delete/:id', deleteUser);

export default router;