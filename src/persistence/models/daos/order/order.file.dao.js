const { HTTP_STATUS } = require('../../../../../constants/api.constants');
const { HttpError } = require('../../../../../utils/api.utils');
const FileContainer = require('../../containers/file/file.container');
const dbConfig = require('../../../db/db.config');

const collection = dbConfig.file.orders;

class OrderDao extends FileContainer {
    constructor() {
        super(collection);
    }

    async createOrder(orderItem){
        try {
            orderItem.id = undefined;
            const order = await this.save(orderItem);
            return order;
        }catch(error) {
            throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, error.details, error);
        }
    };

    async getOrders() {
        try {
            const document = await this.getAll();
            return document;
        }
        catch(error) {
            throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, error.details, error);
        }
    }
    
    async getOrderById(id){
        try {
            return await this.getById(id);
        }
        catch(error) {
            throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, error, error);
        }
    }
    
    async getOrdersByEmail(email) {
        try {
            const document = await this.getMany({field: 'email', value: email});
            return document;
        }
        catch(error) {
            throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, error.details, error);
        }
    }

}

module.exports = OrderDao;