const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    user_id: { type: String, required: true, unique: true },
    products: [{
        id: { type: String },
        qty: { type: Number }
    }],
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true }
});

CartSchema.index({ tittle: 1 });
module.exports = CartSchema;