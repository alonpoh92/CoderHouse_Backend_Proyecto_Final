const { productsSchema, productsCollection } = require("../../../utils/products.utils");
const MongoContainer = require("../../containers/mongo.container");

class ProductsMongoDao extends MongoContainer{
    constructor(){
        super(productsCollection, productsSchema);
    }
}

module.exports = ProductsMongoDao;