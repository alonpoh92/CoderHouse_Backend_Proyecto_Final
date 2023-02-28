const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    user_id: { type: String, required: true },
    products: [{ 
        id: { type: String, required: true },
        qty: { type: Number, required: true },
        name: {type: String, required: true}, 
        description: {type: String, required: true},
        code: {type: String, required: true},
        photo: {type: String, required: true},
        price: {type: Number, required: true} 
    }],
    createdAt: { type: Date, required: true }
});

module.exports = OrderSchema;