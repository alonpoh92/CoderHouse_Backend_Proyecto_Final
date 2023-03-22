const { HTTP_STATUS } = require('../../../../../constants/api.constants');
const { HttpError } = require('../../../../../utils/api.utils');
const FileContainer = require('../../containers/file/file.container');
const dbConfig = require('../../../db/db.config');

const collection = dbConfig.file.products;

class ProductDao extends FileContainer {
    constructor() {
        super(collection);
    }

    async createProduct(productItem){
        try {
            productItem.id = undefined;
            const product = await this.save(productItem);
            return product;
        }
        catch(error) {
            throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, error.message, error);
        }
    };

    async updateProduct(productItem){
        try {
            const product = await this.updateById(productItem.id, productItem);
            return product;
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
            throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, error, error);
        }
    };

    async getProductsByCategory(category){
        try {
            return await this.getMany({field: 'category', value: category});
        }
        catch(error) {
            throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, error, error);
        }
    };

    async deleteProductById(id){
        try {
            return await this.deleteById(id);
        }
        catch(error) {
            throw new HttpError(HTTP_STATUS.INTERNAL_ERROR, error, error);
        }
    };
}

module.exports = ProductDao;