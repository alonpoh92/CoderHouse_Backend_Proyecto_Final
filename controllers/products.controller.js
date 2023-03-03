const { ProductsDao } = require('../models/daos/app.daos');
const { HttpError } = require('../utils/api.utils');
const constants = require('../constants/api.constants');

const productsDao = new ProductsDao();

class ProductsController{
    async getProductById(id){
        try {
            const product = await productsDao.getAll({_id: id});
            return product;
        }
        catch(error) {
            throw new HttpError(constants.HTTP_STATUS.INTERNAL_ERROR, error.message, error);
        } 
    }
    
    async getAllProducts(){
        const res = {};
        try{
            const data = await productsDao.getAll();
            res['data'] = data;
            res['error'] = null;
        }catch(error){
            res['data'] = null;
            res['error'] = error.message;
        }
        return res;
    }

    async getFilterProducts(filter){
        const res = {};
        try{
            const data = await productsDao.getAll(filter);
            res['data'] = data;
            res['error'] = null;
        }catch(error){
            res['data'] = null;
            res['error'] = error.message;
        }
        return res;
    }

    /*async getProductById(id){
        const res = {};
        try{
            const data = await productsDao.getById(id);
            res['data'] = data;
            res['error'] = null;
        }catch(error){
            res['data'] = null;
            res['error'] = error.message;
        }
        return res;
    }*/

    async addNewProduct(item){
        const res = {};
        try{
            const data = await productsDao.save(item);
            res['data'] = data;
            res['error'] = null;
        }catch(error){
            res['data'] = null;
            res['error'] = error.message;
        }
        return res;
    }

    async deleteProductById(id){
        const res = {};
        try{
            const data = await productsDao.deleteById(id);
            res['data'] = data;
            res['error'] = null;
        }catch(error){
            res['data'] = null;
            res['error'] = error.message;
        }
        return res;
    }
    
}

module.exports = new ProductsController();