const { HTTP_STATUS } = require('../../../../../constants/api.constants');
const { HttpError } = require('../../../../../utils/api.utils');
const FirebaseContainer = require('../../containers/firebase/firebase.container');

const collection = 'carts';

class CartDao extends FirebaseContainer {
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
            throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, error.message, error);
        }
    }
    
    async getCartByEmail(email) {
        try {
            const document = await this.getByEmail(email);
            return document;
        }
        catch(error) {
            throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, error.message, error);
        }
    }

    async updateCart(cartItem){
        try {
            const product = await this.updateById(cartItem.id, cartItem);
            return product;
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
            throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, error.message, error);
        }
    };

}

module.exports = CartDao;