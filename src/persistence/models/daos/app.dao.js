const env = require('../../../../env.config');

const daos = {
    DEVELOPMENT: {
        file: {
            CartDao: require('./cart/cart.file.dao'),
            MessageDao: require('./message/message.file.dao'),
            OrderDao: require('./order/order.file.dao'),
            ProductDao: require('./product/product.file.dao'),
            UserDao: require('./user/user.file.dao')
        }
    },
    PRODUCTION: {
        firebase: {
            CartDao: require('./cart/cart.firebase.dao'),
            MessageDao: require('./message/message.firebase.dao'),
            OrderDao: require('./order/order.firebase.dao'),
            ProductDao: require('./product/product.firebase.dao'),
            UserDao: require('./user/user.firebase.dao')
        },
        mongo: {
            CartDao: require('./cart/cart.mongo.dao'),
            MessageDao: require('./message/message.mongo.dao'),
            OrderDao: require('./order/order.mongo.dao'),
            ProductDao: require('./product/product.mongo.dao'),
            UserDao: require('./user/user.mongo.dao')
        }
    }
}

module.exports = daos[env.NODE_ENV][env.PERSISTENCE];