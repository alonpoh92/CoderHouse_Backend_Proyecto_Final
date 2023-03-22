const OrderFactory = require('../../persistence/models/factories/orders.factory');
const CartFactory = require('../../persistence/models/factories/carts.factory');
const ProductFactory = require('../../persistence/models/factories/products.factory');
const { successResponse, errorResponse } = require('../../../utils/api.utils');
const emailController = require('../email/email.controller');
const env = require('../../../env.config');

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

                let total = 0;
                let htmlItems = `<table>
                                    <tr>
                                        <th>Image</th>
                                        <th>Title</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Total</th>                                        
                                    </tr>`;
                for(let item of newItems){
                    htmlItems +=    `<tr>
                                        <td><img src="${item.thumbnail}" style="max-widt: 100px"></td>
                                        <td>${item.title}</td>
                                        <td>${item.qty}</td>
                                        <td>$${item.price}</td>
                                        <td>$${item.qty*item.price}</td>
                                    </tr>`;
                    
                    total += item.qty*item.price;
                }

                htmlItems += `<tr>
                                <td colspan="4">Grand Total</td>
                                <td>$${total}</td>
                            </table>`

                await emailController.sendMail({
                    from: "Store Server",
                    to: env.ADMIN_EMAIL,
                    subject: "New Order",
                    html: `<h2 style="margin-bottom: 10px">New Order Info:</h2>
                    <p><span style="font-weight: bold; margin-right: 5px;">User:</span>${cart.email}</p>
                    <p><span style="font-weight: bold; margin-right: 5px;">Address:</span>${address}</p>
                    <p><span style="font-weight: bold; margin-right: 5px;">Items:</span></p>${htmlItems}`
                }, "gmail")

                await emailController.sendMail({
                    from: "Store Server",
                    to: cart.email,
                    subject: "New Order",
                    html: `<h2 style="margin-bottom: 10px">New Order Info:</h2>
                    <p><span style="font-weight: bold; margin-right: 5px;">Address:</span>${address}</p>
                    <p><span style="font-weight: bold; margin-right: 5px;">Items:</span></p>${htmlItems}`
                }, "gmail")

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