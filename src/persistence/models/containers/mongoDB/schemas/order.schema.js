const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    id: { type: String, required: true, unique: true },
    email: { type: String, required: true,
        match: [
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
          "Invalid email",
        ],
    },
    items: [{ 
        id: { type: String, required: true },
        qty: { type: Number, required: true },
        title: {type: String, required: true}, 
        price: {type: Number, required: true},
        description: {type: String, required: true},
        category: { type: String, required: true },
        thumbnail: { type: String, required: true }
    }],
    address: { type: String, required: true },
    createdAt: { type: Date, required: true }
});

module.exports = OrderSchema;