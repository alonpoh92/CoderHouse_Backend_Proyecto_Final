const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    id: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    items: [{
        id: { type: String },
        qty: { type: Number }
    }],
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true }
});

module.exports = CartSchema;