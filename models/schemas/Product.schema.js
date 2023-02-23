const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String, required: true, unique: true, },
  description: { type: String, required: true },
  code: { type: String, required: true },
  photo: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
});
ProductSchema.index({ tittle: 1 });
module.exports = ProductSchema;