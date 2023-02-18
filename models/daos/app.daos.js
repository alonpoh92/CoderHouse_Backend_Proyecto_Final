const envConfig = require('../../config');

const Daos = {
    mongo: {
        ProductsDao: require('./products/products.mongo.dao'),
        CartsDao: require('./carts/carts.mongo.dao')
    }
}

const { ProductsDao, CartsDao } = Daos["mongo"];

module.exports = {
    ProductsDao,
    CartsDao
}