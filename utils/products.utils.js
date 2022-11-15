const { Schema } = require("mongoose");

module.exports = {
    productsCollection : 'products',
    productsSchema : new Schema({
        id: { type: Number, unique: true },
        timestamp : { type: Date },
        name: { type : String },
        description: { type : String },
        code: { type : String },
        photo: { type : String },
        price: { type : Decimal128 },
        stock: { type: Number}
    })
}