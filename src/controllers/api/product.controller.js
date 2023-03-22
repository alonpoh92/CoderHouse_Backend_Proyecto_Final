const ProductFactory = require('../../persistence/models/factories/products.factory');
const { successResponse, errorResponse } = require('../../../utils/api.utils');

const Factory = new ProductFactory();

class ProductController{
    getAll = async(req, res) => {
        try{
            const products = await Factory.getProducts();
            res.json(successResponse(products));
        }catch(error){
            res.json(errorResponse(error.message, error.details));
        }
    };

    getById = async(req, res) => {
        const {id} = req.params;
        try{
            const product = await Factory.getProductById(id);
            res.json(successResponse(product));
        }catch(error){
            res.json(errorResponse(error.message, error.details));
        }
    };

    getByCategory = async(req, res) => {
        const {category} = req.params;
        try{
            const products = await Factory.getProductsByCategory(category);
            res.json(successResponse(products));
        }catch(error){
            res.json(errorResponse(error.message, error.details));
        }
    };

    addProduct = async(req, res) => {
        const {title, price, description, category, thumbnail, stock} = req.body;
        if(title && Number(price) && description && category && thumbnail && Number(stock)){
            try{
                const product = await Factory.createProduct({title, price, description, category, thumbnail, stock});
                res.json(successResponse(product));
            }catch(error){
                res.json(errorResponse(error.message, error.details));
            }
        }else{
            const message = "Not valid or incomplete data"
            res.json(errorResponse(message, message));
        }
    };

    updateProduct = async(req, res) => {
        const {id} = req.params;
        const {title, price, description, category, thumbnail, stock} = req.body;
        if(id, title && Number(price) && description && category && thumbnail && Number(stock)){
            try{
                const oldProduct = await Factory.getProductById(id);
                const product = await Factory.updateProduct({id: oldProduct.id, title, price, description, category, thumbnail, stock, createdAt: oldProduct.createdAt});
                res.json(successResponse(product));
            }catch(error){
                res.json(errorResponse(error.message, error.details));
            }
        }else{
            const message = "Not valid or incomplete data"
            res.json(errorResponse(message));
        }
    };

    deleteProduct = async(req, res) => {
        const {id} = req.params;
        try{
            const product = await Factory.deleteProductById(id);
            res.json(successResponse({message: product}));
        }catch(error){
            res.json(errorResponse(error.message, error.details));
        }
    };
}

module.exports = new ProductController();