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

// Get all orders
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

// Get single order
export const getSingleOrder = async (req, res, next) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Zamówienie nie zostało znalezione" });
    }

    res.status(200).json(order);
  } catch (error) {
    next(errorHandler(500, "Błąd podczas pobierania zamówienia"));
  }
};

// Get order by user id
export const getUserOrders = async (req, res) => {
  try {

    const userId = req.params.id;

    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Błąd przy pobieraniu zamówień' });
  }
};

// Edit order status
export const updateOrderStatus = async (req, res, next) => {
  const { id, newStatus } = req.body;

  console.log('data', req.body)

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status: newStatus },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Zamówienie nie zostało znalezione" });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    next(errorHandler(500, "Błąd podczas aktualizacji statusu zamówienia"));
  }
};

// Edit order tracking
export const updateOrderTracking = async (req, res, next) => {
  const { id, trackingUrl } = req.body;

  console.log('data', req.body)

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { trackingUrl },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Zamówienie nie zostało znalezione" });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    next(errorHandler(500, "Błąd podczas aktualizacji statusu zamówienia"));
  }
};
