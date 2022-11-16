const { ProductsDao } = require('../models/daos/app.daos');

const productsDao = new ProductsDao();

class ProductsController{
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

    async getProductById(id){
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
    }

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

module.exports.ProductsController = ProductsController;