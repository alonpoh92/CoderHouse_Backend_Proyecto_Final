const MongoDBContainer = require('../../containers/mongo.container');

const cartsSchema = require('../../schemas/Carts.schema');

const collection = 'carts';

class CartsDao extends MongoDBContainer{
    constructor(){
        super(collection, cartsSchema);
    }
}

module.exports = CartsDao;