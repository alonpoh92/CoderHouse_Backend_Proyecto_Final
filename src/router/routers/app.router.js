const express = require('express');
const compression = require('compression');

const apiRoutes = require('./api/api.router');
const auth = require('../../business/middlewares/auth.middleware');
const RouterController = require('../../controllers/router/app.controller');

const router = express.Router();

//Routes
router.use('/api', apiRoutes);
router.get('/', RouterController.home);
router.get('/products', auth, RouterController.products);
router.get('/products/:category', auth, RouterController.products);
router.get('/product/:id', auth, RouterController.product);
router.get('/cart', auth, RouterController.cart);
router.get('/orders', auth, RouterController.orders);
router.get('/order/:id', auth, RouterController.order);
router.get('/chat', auth, RouterController.chat);
router.get('/info', compression(), RouterController.info);

module.exports = router;