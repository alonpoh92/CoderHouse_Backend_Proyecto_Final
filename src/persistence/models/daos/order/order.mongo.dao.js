const { HTTP_STATUS } = require('../../../../../constants/api.constants');
const { HttpError } = require('../../../../../utils/api.utils');
const MongoDBContainer = require('../../containers/mongoDB/mongodb.container');
const UserSchema = require('../../containers/mongoDB/schemas/order.schema');

const collection = 'orders';

class OrderDao extends MongoDBContainer {
    constructor() {
        super(collection, UserSchema);
    }

    async createOrder(orderItem){
        try {
            const order = await this.save(orderItem);
            order.id = ''+order._id;
            await this.update(order.id, order);
            return order;
        }
        catch(error) {
            throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, error.message, error);
        }
    };

    async getOrders() {
        try {
            return await this.getAll();
        }catch(error) {
            throw new HttpError(constants.HTTP_STATUS.INTERNAL_ERROR, error.message, error);
        }
    }

    async getOrderById(id){
        try {
            return await this.getById(id);
        }
        catch(error) {
            throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, error.message, error);
        }
    }
    
    async getOrdersByEmail(email) {
        try {
            return await this.getAll({email});
        }catch(error) {
            throw new HttpError(constants.HTTP_STATUS.INTERNAL_ERROR, error.message, error);
        }
    }

}

module.exports = OrderDao;