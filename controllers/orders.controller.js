const { OrdersDao } = require('../models/daos/app.daos');
const { HttpError } = require('../utils/api.utils');
const constants = require('../constants/api.constants');
const { formatOrderForDB } = require('../utils/formats/orders.util');
const cartController = require('./carts.controller');
const productController = require('./products.controller');

const ordersDao = new OrdersDao();

class OrdersController{
    placeOrder = async (req, res) => {
        try{
            const cart = await cartController.getCartByUserId(''+req.user._id);
            const cartId = ''+cart[0]._id;
            let products = [];
            for(let product of cart[0].products){
                let productDetails = await productController.getProductById(product.id);
                productDetails = productDetails[0];
                products.push({...{id: product.id, qty: product.qty}, ...{
                    name: productDetails.name, 
                    description: productDetails.description,
                    code: productDetails.code,
                    photo: productDetails.photo,
                    price: productDetails.price
                }});
            }
            const newOrder = formatOrderForDB({userId: ''+req.user._id, products})
            await ordersDao.save(newOrder);
            await cartController.deleteCart(cartId);
            res.status(200).json({success: true, error: undefined}); 
        }catch(error){
            console.log(error.message)
            res.status(400).json({success: false, error: error.message}); 

        }
    }
}

module.exports = new OrdersController();