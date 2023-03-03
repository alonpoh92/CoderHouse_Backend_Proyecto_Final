const express = require('express');
const path = require('path');

const productController = require('../controllers/products.controller');
const cartController = require('../controllers/carts.controller');
const navbarController = require('../controllers/navbar.controller');

const authMiddleware = require('../middlewares/auth');
const apiRoutes = require('./api/api.routes');

const router = express.Router();

router.use('/api', apiRoutes);

router.get('/', authMiddleware(true, '/login'), async (req, res) => {
  const search = req.query.search;
  const data = req.user;
  let products;
  data.qtyItems = await navbarController.getQtyProducts(''+req.user._id);
  data.hasItems = data.qtyItems > 0;
  if(search == undefined || search.trim() == ""){
    products = await productController.getAllProducts();
  }else{
    data.filter = search;
    products = await productController.getFilterProducts({$or: [{name: {$regex: new RegExp(search.trim().replace(" ", "|"), "i")}}, {description: {$regex: new RegExp(search.trim().replace(" ", "|"), "i")}}]});
  }
  data.products = products.data;
  data.hasProducts = data.products.length > 0;
  data.products.map(product => {
    if(!product.photo.includes("http")){
      product.photoInternal = true;
    }else{
      product.photoInternal = false;
    }
    product.id = ''+product._id;
  });
  data.error = products.error;
  return res.render('store', data);
});

router.get('/cart', authMiddleware(true, '/login'), async (req, res) => {
  let data = req.user;
  let cart = await cartController.getCartByUserId(''+data._id);
  if(cart.length < 1){
    cart = await cartController.createNewCart(''+data._id);
  }else{
    cart = cart[0];
  }
  data.qtyItems = await navbarController.getQtyProducts(''+req.user._id);
  data.hasItems = data.qtyItems > 0;
  data.products = [];
  data.total = 0;
  for(let product of cart.products){
    const productDetails = await productController.getProductById(product.id);
    data.total += productDetails[0].price * product.qty
    data.products.push({...product, ...productDetails[0]});
  }
  data.products.map(product => {
    if(!product.photo.includes("http")){
      product.photoInternal = true;
    }else{
      product.photoInternal = false;
    }
    product.id = ''+product._id;
  });
  return res.render('cart', data);
});

router.get('/login', authMiddleware(false, '/'), (req, res) => {
  return res.sendFile(path.resolve(__dirname, '../public/login.html'));
});

router.get('/profile', authMiddleware(true, '/login'), async (req, res) => {
  const data = req.user;
  data.qtyItems = await navbarController.getQtyProducts(''+req.user._id);;
  data.hasItems = data.qtyItems > 0;
  return res.render('profile', data);
});

router.get('/signin-error', authMiddleware(false, '/'), (req, res) => {
  return res.render('signin-error', {layout: false});
});

router.get('/signup-error', authMiddleware(false, '/'), (req, res) => {
  return res.render('signup-error', {layout: false});
});


module.exports = router;