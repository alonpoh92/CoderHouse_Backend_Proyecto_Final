const { HTTP_STATUS } = require('../../../../../constants/api.constants');
const { HttpError } = require('../../../../../utils/api.utils');
const MongoDBContainer = require('../../containers/mongoDB/mongodb.container');
const ProductSchema = require('../../containers/mongoDB/schemas/product.schema');

const collection = 'products';

class ProductDao extends MongoDBContainer {
    constructor() {
        super(collection, ProductSchema);
    }

    async createProduct(productItem){
        try {
            const product = await this.save(productItem);
            product.id = ''+product._id;
            await this.update(product.id, product);
            return product;
        }
        catch(error) {
            if (error.message.toLowerCase().includes('e11000') || error.message.toLowerCase().includes('duplicate')) {
                throw new HttpError(HTTP_STATUS.BAD_REQUEST, 'Product with given id already exist');
            }
            throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, error.message, error);
        }
    };

    async updateProduct(productItem){
        try {
            return await this.update(productItem.id, productItem);
        }
        catch(error) {
            throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, error.message, error);
        }
    };

    async getProducts(){
        try {
            return await this.getAll();
        }
        catch(error) {
            throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, error.message, error);
        }
    };

    async getProductById(id){
        try {
            return await this.getById(id);
        }
        catch(error) {
            throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, error.message, error);
        }
    };

    async getProductsByCategory(category){
        try {
            return await this.getAll({category});
        }
        catch(error) {
            throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, error.message, error);
        }
    };

    async deleteProductById(id){
        try {
            return await this.delete(id);
        }
        catch(error) {
            throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, error.message, error);
        }
    };

}

module.exports = ProductDao;