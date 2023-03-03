const env = require('../config');
const { OrdersDao } = require('../models/daos/app.daos');
const { formatOrderForDB } = require('../utils/formats/orders.util');
const cartController = require('./carts.controller');
const productController = require('./products.controller');
const smsController = require('./sms.controller');
const emailController = require('./email.controller');

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
            const order = await ordersDao.save(newOrder);
            await cartController.deleteCart(cartId);
            await smsController.sendSMS({
                body: `Hi ${req.user.name}, your order has been placed with id: ${order._id}`,
                from: env.TWILIO_PHONE,
                to: `${req.user.phoneCode}${req.user.phone}`
            });
            let totalCart = 0;
            let html = `<h2 style="margin-bottom: 10px">New Order Info:</h2>
                        <table>
                            <tr>
                                <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Product</th>
                                <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Quantity</th>
                                <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Unit Price</th>
                                <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Total Price</th>
                            </tr>`;
            for(let product of order.products){
                html += `<tr>
                            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${product.name}</td>
                            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${product.qty}</td>
                            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">$${product.price}</td>
                            <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">$${product.price * product.qty}</td>
                        </tr>`
                totalCart += product.price * product.qty;
            }
            html += `<tr>
                        <td colspan="3" style="border: 1px solid #dddddd; text-align: right; padding: 8px;">GRAND TOTAL</td>
                        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">$${totalCart}</td>
                    </table>`

            await emailController.sendMail({
                from: "Store Server",
                to: env.ADMIN_EMAIL,
                subject: `New order from ${req.user.name} (${req.user.email})`,
                html: html}, "gmail")
            res.status(200).json({success: true, error: undefined}); 
        }catch(error){
            res.status(400).json({success: false, error: error.message}); 

        }
    }
}

module.exports = new OrdersController();