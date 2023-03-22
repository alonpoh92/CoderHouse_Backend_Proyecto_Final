const { HTTP_STATUS } = require('../../../../../constants/api.constants');
const { HttpError } = require('../../../../../utils/api.utils');
const FileContainer = require('../../containers/file/file.container');
const dbConfig = require('../../../db/db.config');

const collection = dbConfig.file.carts;

class CartDao extends FileContainer {
    constructor() {
        super(collection);
    }

    async createCart(cartItem){
        try {
            const emailCart = await this.getByEmail(cartItem.email);
            if(emailCart.length > 0){
                throw new Error('Cart with given email already exist');                
            }
        }
        catch(error) {
            if(error.message.toLowerCase().includes('does not exist')){
                cartItem.id = undefined;
                const cart = await this.save(cartItem);
                return cart;
            }else{
                throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, error.message, error);
            }
        }
    };
    
    async getCartById(id){
        try {
            return await this.getById(id);
        }
        catch(error) {
            throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, error, error);
        }
    }
    
    async getCartByEmail(email) {
        try {
            const document = await this.getByEmail(email);
            return document;
        }
        catch(error) {
            throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, error.details, error);
        }
    }

    async updateCart(cartItem){
        try {
            const cart = await this.updateById(cartItem.id, cartItem);
            return cart;
        }
        catch(error) {
            throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, error.message, error);
        }
    };

    async deleteCartById(id){
        try {
            return await this.deleteById(id);
        }
        catch(error) {
            throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, error, error);
        }
    };

}

module.exports = CartDao;