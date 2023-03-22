const path = require('path');
const os = require('os');

const CartFactory = require('../../persistence/models/factories/carts.factory');
const ProductFactory = require('../../persistence/models/factories/products.factory');
const args = require('../../../utils/minimist.utils');

const Cart = new CartFactory();
const Product = new ProductFactory();

class RouterController{
    home = (req, res) => {
        const user = req.user;
        if (user) {
            return res.redirect('/profile');
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
            cart.items.map((item) => {qtyItems += Number(item.qty)});
            hasItems = qtyItems > 0;
            hasProducts = products.length > 0;
        }catch(err){
            error = err;
        }
        res.render('products', {hasItems, qtyItems, products, categories, hasProducts, cartId, error});
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

    signin_error = (req, res) => {
        res.render('signin-error', {layout: false});
    }

    signup_error = (req, res) => {
        res.render('signup-error', {layout: false});
    }
}

module.exports = new RouterController();