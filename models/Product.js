import mongoose, { models, model } from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    description: { type: String, required: true },
    specifications: [{ title: String, value: String }],
    forSale: { type: Boolean, required: true },
    photos: [String],
  },
  { timestamps: true }
);

const Product = models.Product || model("Product", productSchema);

export default Product;
