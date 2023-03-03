const { CartsDao } = require('../models/daos/app.daos');
const { HttpError } = require('../utils/api.utils');
const constants = require('../constants/api.constants');
const { formatCartForDB } = require('../utils/formats/carts.utils');

const cartsDao = new CartsDao();

class CartsController{

    async createNewCart(userId){
        try {
            const cartItem = formatCartForDB({userId: userId});
            const cart = await cartsDao.save(cartItem);
            return cart;
        }
        catch(error) {
            if (error.message.toLowerCase().includes('e11000') || error.message.toLowerCase().includes('duplicate')) {
                throw new HttpError(constants.HTTP_STATUS.BAD_REQUEST, 'Cart with given userId already exist');
            }
            throw new HttpError(constants.HTTP_STATUS.INTERNAL_ERROR, error.message, error);
        }  
    }

    async getCartByUserId(userId){
        try {
            const cart = await cartsDao.getAll({user_id: userId});
            return cart;
        }
        catch(error) {
            throw new HttpError(constants.HTTP_STATUS.INTERNAL_ERROR, error.message, error);
        } 
    }

    async updateCart(id, cartItem){
        try {
            const cart = await cartsDao.update(id, cartItem);
            return cart;
        }
        catch(error) {
            throw new HttpError(constants.HTTP_STATUS.INTERNAL_ERROR, error.message, error);
        }
    };

    async deleteCart(id){
        try {
            const cart = await cartsDao.deleteById(id);
            return;
        }
        catch(error) {
            throw new HttpError(constants.HTTP_STATUS.INTERNAL_ERROR, error.message, error);
        }
    }

    /*
    async addNewCart(item){
        const res = {};
        try{
            const data = await cartsDao.save(item);
            res['data'] = data;
            res['error'] = null;
        }catch(error){
            res['data'] = null;
            res['error'] = error.message;
        }
        return res;
    }

    async getCartById(id){
        const res = {};
        try{
            const data = await cartsDao.getById(id);
            res['data'] = data;
            res['error'] = null;
        }catch(error){
            res['data'] = null;
            res['error'] = error.message;
        }
        return res;
    }

    async deleteCartById(id){
        const res = {};
        try{
            const data = await cartsDao.deleteById(id);
            res['data'] = data;
            res['error'] = null;
        }catch(error){
            res['data'] = null;
            res['error'] = error.message;
        }
        return res;
    }
    */
}

module.exports = new CartsController();