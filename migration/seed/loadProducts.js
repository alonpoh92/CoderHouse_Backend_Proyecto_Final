const products = require('./products.json');
const { formatProductForDB } = require('../../utils/formats/products.utils');
const logger = require('../../utils/logger.utils');
const dataSource = require('../../models/containers/mongo.container');
const productController = require('../../controllers/products.controller');

dataSource.connect().then(async () => {
    logger.trace(`Connected to MongoDb`);
    let i = 1;
    for(let product of products.products){
        const newItem = {
            name: product.title,
            description: product.description,
            code: "test_Item",
            photo: product.thumbnail,
            price: product.price,
            stock: product.stock,
        }
        const newProduct = formatProductForDB(newItem);
        newProduct.photo = product.thumbnail;
        const res = await productController.addNewProduct(newProduct);
        logger.trace(`Loaded ${i} of ${products.products.length} --> ${Math.round((i/products.products.length)*100)}%`)
        i++;
    }
    logger.trace(`${products.products.length} products loaded successfully`);
    process.exit();
});

