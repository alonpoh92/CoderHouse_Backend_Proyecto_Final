const express = require('express');

const authRoutes = require('./auth.router');
const productRoutes = require('./product.router');
const messageRoutes = require('./auth.router');
const cartRoutes = require('./cart.router');
const orderRoutes = require('./order.router');

const router = express.Router();

//Routes
router.use('/auth', authRoutes);
router.use('/product', productRoutes);
router.use('/cart', cartRoutes);
router.use('/order', orderRoutes);
router.use('/message', messageRoutes);

module.exports = router;