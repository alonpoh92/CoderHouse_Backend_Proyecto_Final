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
router.get('/info', compression(), RouterController.info);

module.exports = router;