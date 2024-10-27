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

// Get single product
export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(errorHandler(404, 'Product not found!'));
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
}

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

// Edit product
export const updateProduct = async (req, res, next) => {
  console.log('req is', req.body);

  try {
    const updatedFields = {
      name: req.body.name,
      category: req.body.category,
      subcategory: req.body.subcategory,
      productCode: req.body.productCode,
      producer: req.body.producer,
      price: req.body.price,
      discountedPrice: req.body.discountedPrice,
      shortDescription: req.body.shortDescription,
      description: req.body.description,
      details: req.body.details,
      imageUrls: req.body.imageUrls,
      delivery: req.body.delivery,
      promotion: req.body.promotion,
      sale: req.body.sale,
    };

    // Aktualizuj produkt w bazie danych
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: updatedFields },
      { new: true } // opcja new: true zwraca zaktualizowany dokument
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
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