const { Schema } = require("mongoose");
const { productsSchema } = require("./products.utils");

module.exports = {
    cartsCollection : 'carts',
    cartsSchema : new Schema({
        id: { type: Number },
        timestamp : { type: Date },
        products: [{ type: productsSchema }]
    })
}