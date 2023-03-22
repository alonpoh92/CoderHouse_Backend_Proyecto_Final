const path = require('path');
const os = require('os');

const CartFactory = require('../../persistence/models/factories/carts.factory');
const ProductFactory = require('../../persistence/models/factories/products.factory');
const OrderFactory = require('../../persistence/models/factories/orders.factory');
const args = require('../../../utils/minimist.utils');

const Cart = new CartFactory();
const Product = new ProductFactory();
const Order = new OrderFactory();

class RouterController{
    home = (req, res) => {
        const user = req.user;
        if (user) {
            return res.redirect('/products');
        }
        else {
            return res.sendFile(path.resolve(__dirname, '../../router/public/login.html'));
        }
    };

    products = async (req, res) => {
        const user = req.user;
        const cart = await Cart.getCartByEmail(user.email);
        const cartId = cart.id;
        const { category } = req.params;
        let products = [];
        let qtyItems = 0;
        let hasItems = false;
        let hasProducts = false;
        let error = undefined;
        const categories = [];
        cart.items.map((item) => {qtyItems += Number(item.qty)});
        hasItems = qtyItems > 0;
        try{
            products = await Product.getProducts();
            products.map((product) => {
                product.cartId = cartId;
                if(!categories.includes(product.category)){
                    categories.push(product.category);
                }
            });
            if(category){            
                products = await Product.getProductsByCategory(category);
                products.map((product) => {
                    product.cartId = cartId;
                });
            }
            hasProducts = products.length > 0;
        }catch(err){
            error = err;
        }
        res.render('products', {hasItems, qtyItems, products, categories, hasProducts, error});
    };

    product = async (req, res) => {
        const user = req.user;
        const cart = await Cart.getCartByEmail(user.email);
        const cartId = cart.id;
        const { id } = req.params;
        let products = [];
        let product = {};
        let qtyItems = 0;
        let hasItems = false;
        let error = undefined;
        const categories = [];
        cart.items.map((item) => {qtyItems += Number(item.qty)});
        hasItems = qtyItems > 0;
        try{
            products = await Product.getProducts();
            products.map((product) => {
                product.cartId = cartId;
                if(!categories.includes(product.category)){
                    categories.push(product.category);
                }
            });
            product = await Product.getProductById(id);
            product.cartId = cartId;
            console.log(product)
        }catch(err){
            error = err;
        }
        res.render('product', {hasItems, qtyItems, product, categories, error});
    };

    cart = async (req, res) => {
        const user = req.user;
        const cart = await Cart.getCartByEmail(user.email);
        const cartId = cart.id;
        let products = [];
        let qtyItems = 0;
        let hasItems = false;
        let error = undefined;
        let total = 0;
        const categories = [];
        products = await Product.getProducts();
        products.map((product) => {
            product.cartId = cartId;
            if(!categories.includes(product.category)){
                categories.push(product.category);
            }
        });
        for(let item of cart.items){
            const product = await Product.getProductById(item.id);
            total += product.price*item.qty;
            qtyItems += Number(item.qty);
            products.push({...product, qty: item.qty, cartId});
        };
        hasItems = qtyItems > 0;
        res.render('cart', {hasItems, qtyItems, products, categories, total, error});
    };

    orders = async (req, res) => {
        const user = req.user;
        const cart = await Cart.getCartByEmail(user.email);
        const cartId = cart.id;
        const { category } = req.params;
        let products = [];
        let orders = [];
        let qtyItems = 0;
        let hasItems = false;
        let hasOrders = false;
        let error = undefined;
        const categories = [];
        cart.items.map((item) => {qtyItems += Number(item.qty)});
        hasItems = qtyItems > 0;
        try{
            products = await Product.getProducts();
            products.map((product) => {
                product.cartId = cartId;
                if(!categories.includes(product.category)){
                    categories.push(product.category);
                }
            });
            orders = await Order.getOrdersByEmail(user.email);
            for(let order of orders){
                order.qtyItems = 0;
                order.total = 0;
                for(let item of order.items){
                    order.qtyItems += Number(item.qty);
                    order.total += Number(item.price)*Number(item.qty);
                }
            }
            hasOrders = orders.length > 0;
        }catch(err){
            error = err;
        }
        res.render('orders', {hasItems, qtyItems, hasOrders, orders, categories, error});
    };

    order = async (req, res) => {
        const user = req.user;
        const {id} = req.params;
        const cart = await Cart.getCartByEmail(user.email);
        const cartId = cart.id;
        let products = [];
        let orders = [];
        let qtyItems = 0;
        let hasItems = false;
        let error = undefined;
        let total = 0;
        const categories = [];
        try{
            products = await Product.getProducts();
            products.map((product) => {
                product.cartId = cartId;
                if(!categories.includes(product.category)){
                    categories.push(product.category);
                }
            });
            orders = await Order.getOrderById(id);
            for(let item of orders.items){
                total += Number(item.price)*Number(item.qty);
            }
            console.log(orders)
            hasItems = qtyItems > 0;
        }catch(err){
            error = err;
        }
        res.render('order', {hasItems, qtyItems, orders, categories, total, error});
    };

    chat = async (req, res) => {
        const user = req.user;
        const {id} = req.params;
        const cart = await Cart.getCartByEmail(user.email);
        const cartId = cart.id;
        let products = [];
        let orders = [];
        let qtyItems = 0;
        let hasItems = false;
        let error = undefined;
        let total = 0;
        const categories = [];
        try{
            products = await Product.getProducts();
            products.map((product) => {
                product.cartId = cartId;
                if(!categories.includes(product.category)){
                    categories.push(product.category);
                }
            });
            hasItems = qtyItems > 0;
        }catch(err){
            error = err;
        }
        res.render('chat', {hasItems, qtyItems, categories, user})
    };

    info = (req, res) => {
        const data = {};
        data.args = [];
        for(let key in args){
            if(key == "_"){
                data.args.push({key: 'others', value: args[key]});
            }else{
                data.args.push({key, value: args[key]});
            }
        }
        data.platform = process.platform;
        data.version = process.version;
        data.memory = process.memoryUsage().rss;
        data.executionPath = process.argv[0];
        data.pid = process.pid;
        data.folderPath = process.cwd();
        data.cpus = os.cpus().length;
        res.render('info', {layout: false, data})
    };
}

module.exports = new RouterController();