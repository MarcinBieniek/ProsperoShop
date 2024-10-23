import Product from "../models/product.model.js";

// Get all products
export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

// Create new product
export const createProduct = async (req, res, next) => {

  console.log('product body is', req.body)

  try {
    const product = await Product.create(req.body);
    return res.status(201).json(product)
  } catch (error) {
    next(error)
  }
};

// delete product
export const deleteProduct = async (req, res, next) => {

  console.log('product id is', req.body)

  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Product has been deleted!' });
  } catch (error) {
    next(error)
  }
}