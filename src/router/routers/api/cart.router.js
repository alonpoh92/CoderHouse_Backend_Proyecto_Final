const express = require('express');
const CartController = require('../../../controllers/api/cart.controller');

const router = express.Router();

router.get('/:id', CartController.getById);
router.post('/:id', CartController.addToCart);
router.put('/:id', CartController.updateCart);

module.exports = router;