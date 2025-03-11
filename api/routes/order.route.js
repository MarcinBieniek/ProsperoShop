import express from 'express';
import {
    createOrder,
    getAllOrders,
    updateOrderStatus,
    getSingleOrder,
    getUserOrders,
    updateOrderTracking
  }
  from '../controllers/order.controller.js';
import { verifyAdmin, verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/get', verifyToken, verifyAdmin, getAllOrders);
router.post('/create', verifyToken, createOrder);
router.get("/:id", getSingleOrder); // dla admin route?
router.put('/update-status', updateOrderStatus); // dla admin route?
router.put('/update-tracking', updateOrderTracking); // dla admin route?
router.get('/user/:id', getUserOrders);

export default router;