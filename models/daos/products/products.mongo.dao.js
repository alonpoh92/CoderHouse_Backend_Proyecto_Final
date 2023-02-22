const MongoDBContainer = require('../../containers/mongo.container');

const productSchema = require('../../schemas/Product.schema');

const collection = 'products';

class ProductsDao extends MongoDBContainer {
    constructor() {
      super(collection, productSchema);
    }
}

module.exports = ProductsDao;