const envConfig = require('../../config');

const Daos = {
    mongo: {
        ProductsDao: require('./products/products.mongo.dao'),
        CartsDao: require('./carts/carts.mongo.dao'),
        UsersDao: require('./users/users.mongo.dao')
    }
}

const { ProductsDao, CartsDao, UsersDao } = Daos["mongo"];

module.exports = {
    ProductsDao,
    CartsDao,
    UsersDao
}