const { HTTP_STATUS } = require('../../../../../constants/api.constants');
const { HttpError } = require('../../../../../utils/api.utils');
const MongoDBContainer = require('../../containers/mongoDB/mongodb.container');
const UserSchema = require('../../containers/mongoDB/schemas/cart.schema');

const collection = 'carts';

class CartDao extends MongoDBContainer {
    constructor() {
        super(collection, UserSchema);
    }

    async createCart(cartItem){
        try {
            const cart = await this.save(cartItem);
            cart.id = ''+cart._id;
            await this.update(cart.id, cart);
            return cart;
        }
        catch(error) {
            if (error.message.toLowerCase().includes('e11000') || error.message.toLowerCase().includes('duplicate')) {
                throw new HttpError(HTTP_STATUS.BAD_REQUEST, 'Cart with given email already exist');
            }
            throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, error.message, error);
        }
    };

    async getCartById(id){
        try {
            return await this.getById(id);
        }
        catch(error) {
            throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, error.message, error);
        }
    }
    
    async getCartByEmail(email) {
        try {
            return await this.getAll({email});
        }catch(error) {
            throw new HttpError(constants.HTTP_STATUS.INTERNAL_ERROR, error.message, error);
        }
    }

    async updateCart(cartItem){
        try {
            return await this.update(cartItem.id, cartItem);
        }
        catch(error) {
            throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, error.message, error);
        }
    };

    async deleteCartById(id){
        try {
            return await this.delete(id);
        }
        catch(error) {
            throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, error.message, error);
        }
    };

}

module.exports = CartDao;