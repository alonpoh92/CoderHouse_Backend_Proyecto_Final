const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { ProductSchema } = require("./Product.schema");

const CartSchema = new Schema({
    user_id: { type: String, required: true },
    //products: [{ type: ProductSchema }],
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true }
});

CartSchema.index({ tittle: 1 });
module.exports = CartSchema;