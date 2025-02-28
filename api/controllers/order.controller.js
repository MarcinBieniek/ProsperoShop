import Order from "../models/order.model.js"
import { errorHandler } from "../utils/error.js";

// Create order
export const createOrder = async (req, res, next) => {

  try {
    const order = await Order.create(req.body);
    return res.status(201).json(order)
  } catch (error) {
    next(error)
    console.log('error is', error)
  }
};


