const express = require('express');
const OrderController = require('../../../controllers/api/order.controller');

const router = express.Router();

router.get('/', OrderController.getAll);
router.get('/all/', OrderController.getByEmail);
router.get('/:id', OrderController.getById);
router.post('/:id', OrderController.addOrder);

module.exports = router;