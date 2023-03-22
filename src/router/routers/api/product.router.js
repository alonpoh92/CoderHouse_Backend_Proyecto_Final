const express = require('express');
const ProductController = require('../../../controllers/api/product.controller');

const router = express.Router();

router.get('/', ProductController.getAll);
router.get('/:id', ProductController.getById);
router.get('/category/:category', ProductController.getByCategory);
router.post('/', ProductController.addProduct);
router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;