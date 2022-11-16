const envConfig = require('../../config');

const Daos = {
    memory: {
        ProductsDao: require('./products/products.memory.dao'),
        CartsDao: require('./carts/carts.memory.dao')
    },
    file: {
        ProductsDao: require('./products/products.file.dao'),
        CartsDao: require('./carts/carts.file.dao')
    },
    mongo: {
        ProductsDao: require('./products/products.mongo.dao'),
        CartsDao: require('./carts/carts.mongo.dao')
    },
    firebase: {
        ProductsDao: require('./products/products.firebase.dao'),
        CartsDao: require('./carts/carts.firebase.dao')
    }
}

const { ProductsDao, CartsDao } = Daos[envConfig.DATASOURCE];

module.exports = {
    ProductsDao,
    CartsDao
}