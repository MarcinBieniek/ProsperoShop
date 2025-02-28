// test

import express from 'express';
import {
    createOrder }
  from '../controllers/order.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createOrder);

export default router;