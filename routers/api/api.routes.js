const express = require('express');
const productosRoutes = require('./productos/productos.routes');
const carritoRoutes = require('./carrito/carrito.routes');
const authRoutes = require('./auth/auth.routes');

const router = express.Router();

router.use('/products', productosRoutes);
router.use('/cart', carritoRoutes);
router.use('/auth', authRoutes);

module.exports = router;