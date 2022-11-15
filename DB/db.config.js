const firebaseConfig = require('./firebase/firebase.config.json');

module.exports = {
    file: {
        products: 'data/products.json',
        carts: 'data/carts.json'
    },
    mongodb: {
        uri: 'mongodb+srv://alonpoh92:1144053501.Alons@coderhousebackend.mcdak1d.mongodb.net/?retryWrites=true&w=majority'
    },
    firebase: {
        credentials: firebaseConfig
    }
}