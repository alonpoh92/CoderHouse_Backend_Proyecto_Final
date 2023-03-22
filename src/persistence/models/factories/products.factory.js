const ProductDto = require('../dtos/product.dto');
const { ProductDao } = require('../daos/app.dao');

class ProductFactory{
    constructor(){
        try{
            if(ProductFactory._instance){
                throw new Error('MessageFactory already has an instance!!!');
            }
            this.ProductDao = new ProductDao();
            ProductFactory._instance = this;
        }catch(error){
            this.ProductDao = ProductFactory._instance.ProductDao;
        }
    }

    async createProduct(productObj){
        const newProduct = new ProductDto("undefined", productObj.title, Number(productObj.price), productObj.description, productObj.category.toLowerCase(), productObj.thumbnail, Number(productObj.stock), new Date(), new Date());
        const product = await this.ProductDao.createProduct(newProduct);
        return new ProductDto(product.id, product.title, product.price, product.description, product.category, product.thumbnail, product.stock, product.createdAt, product.updatedAt);
    }

    async updateProduct(productObj){
        const newProduct = new ProductDto(productObj.id, productObj.title, Number(productObj.price), productObj.description, productObj.category.toLowerCase(), productObj.thumbnail, Number(productObj.stock), productObj.createdAt, new Date());
        const product = await this.ProductDao.updateProduct(newProduct);
        return new ProductDto(product.id, product.title, product.price, product.description, product.category, product.thumbnail, product.stock, product.createdAt, product.updatedAt);
    }

    async getProducts(){
        const products = await this.ProductDao.getProducts();
        return products.map(product => {
            return new ProductDto(product.id, product.title, product.price, product.description, product.category, product.thumbnail, product.stock, product.createdAt, product.updatedAt);
        })
    }

    async getProductById(id){
        const product = await this.ProductDao.getProductById(id);
        return new ProductDto(product.id, product.title, product.price, product.description, product.category, product.thumbnail, product.stock, product.createdAt, product.updatedAt);
    }

    async getProductsByCategory(category){
        const products = await this.ProductDao.getProductsByCategory(category.toLowerCase());
        return products.map(product => {
            return new ProductDto(product.id, product.title, product.price, product.description, product.category, product.thumbnail, product.stock, product.createdAt, product.updatedAt);
        })
    }

    async deleteProductById(id){
        return await this.ProductDao.deleteProductById(id);
    }
}

module.exports = ProductFactory;