const firebaseConfig = require('./firebase/firebase.config.json');
const envConfig = require('../config');

module.exports = {
    memory: {
        products: 'products',
        carts: 'carts'
    },
    file: {
        products: 'products',
        carts: 'carts'
    },
    mongodb: {
        uri: `mongodb+srv://${envConfig.DB_USER}:${envConfig.DB_PASSWORD}@coderhousebackend.mcdak1d.mongodb.net/CoderHouseBackend?retryWrites=true&w=majority`
    },
    firebase: {
        credentials: firebaseConfig
    }
}