const MongoDBContainer = require('../../containers/mongo.container');

const ordersSchema = require('../../schemas/Orders.schema');

const collection = 'orders';

class OrdersDao extends MongoDBContainer{
    constructor(){
        super(collection, ordersSchema);
    }
}

module.exports = OrdersDao;