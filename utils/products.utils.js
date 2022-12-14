const { Schema } = require("mongoose");

module.exports = {
    productsCollection : 'products',
    productsSchema : new Schema({
        id: { type: Number },
        timestamp : { type: Date },
        name: { type : String },
        description: { type : String },
        code: { type : String },
        photo: { type : String },
        price: { type : Number },
        stock: { type: Number}
    })
}