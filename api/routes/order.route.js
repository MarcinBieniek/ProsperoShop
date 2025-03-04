import express from 'express';
import {
    createOrder,
    getAllOrders}
  from '../controllers/order.controller.js';
import { verifyAdmin, verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/get', verifyToken, verifyAdmin, getAllOrders);
router.post('/create', verifyToken, createOrder);

export default router;