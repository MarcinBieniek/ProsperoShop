import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true
    },
    subcategory: {
      type: String,
      required: true
    },
    productCode: {
      type: String,
      required: false,
    },
    producer: {
      type: String,
      required: true,
    },
    price:{
      type: Number,
      required: true,
    },
    discountedPrice:{
      type: Number,
      required: false,
    },
    shortDescription:{
      type: String,
      required: true
    },
    description: {
      type: String,
      reguired: true,
    },
    details: {
      type: String,
      required: false,
    },
    imageUrls:{
      type: Array,
      required: true,
    },
    delivery:{
      type: String,
      required: true,
    },
    promotion:{
      type: Boolean,
      required: false,
    },
    sale:{
      type: Boolean,
      required: false,
    }
  }, {timestamps: true}
)

const Product = mongoose.model('Product', productSchema);

export default Product;