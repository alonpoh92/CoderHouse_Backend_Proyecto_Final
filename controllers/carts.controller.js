const { CartsDao } = require('../models/daos/app.daos');

const cartsDao = new CartsDao();

class CartsController{
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
}

module.exports.CartsController = CartsController;