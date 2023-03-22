const OrderFactory = require('../../persistence/models/factories/orders.factory');
const CartFactory = require('../../persistence/models/factories/carts.factory');
const ProductFactory = require('../../persistence/models/factories/products.factory');
const { successResponse, errorResponse } = require('../../../utils/api.utils');

const Factory = new OrderFactory();
const Cart = new CartFactory();
const Product = new ProductFactory();

class OrderController{
    getAll = async(req, res) => {
        try{
            const orders = await Factory.getOrders();
            res.json(successResponse(orders));
        }catch(error){
            res.json(errorResponse(error.message, error.details));
        }
    };

    getById = async(req, res) => {
        const {id} = req.params;
        try{
            const order = await Factory.getOrderById(id);
            res.json(successResponse(order));
        }catch(error){
            res.json(errorResponse(error.message, error.details));
        }
    };

    getByEmail = async(req, res) => {
        const {email} = req.body;
        if(email){
            try{
                const orders = await Factory.getOrdersByEmail(email);
                res.json(successResponse(orders));
            }catch(error){
                res.json(errorResponse(error.message, error.details));
            }
        }else{
            const message = "Not valid or incomplete data"
            res.json(errorResponse(message, message));
        }
    };

    addOrder = async(req, res) => {
        const {id} = req.params;
        const {address} = req.body;
        if(address){
            try{
                const cart = await Cart.getCartById(id);
                let oldItems = cart.items;
                let newItems = [];
                if(oldItems.length > 0){
                    for(let item of oldItems){
                        const newItem = await Product.getProductById(item.id);
                        newItems.push({...newItem, qty: item.qty})
                    }
                }else{
                    throw new Error('Cart must have items to make an order');
                }
                const order = await Factory.createOrder({email: cart.email, items: newItems, address});
                await Cart.deleteCartById(id);
                await Cart.createCart({email: cart.email});
                res.json(successResponse(order));
            }catch(error){
                res.json(errorResponse(error.message, error.details));
            }
        }else{
            const message = "Not valid or incomplete data"
            res.json(errorResponse(message));
        }
    };
}

module.exports = new OrderController();