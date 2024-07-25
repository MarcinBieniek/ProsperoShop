import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      reguired: true,
    },
    regularPrice:{
      type: Number,
      required: true,
    },
    discountedPrice:{
      type: Number,
      required: false,
    },
    imageUrls:{
      type: Array,
      required: false,
    },
    userRef:{
      type: String,
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
    },
  }, {timestamps: true}
)

const Product = mongoose.model('Product', productSchema);

export default Product;