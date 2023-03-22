const express = require('express');
const MessageController = require('../../../controllers/api/message.controller');

const router = express.Router();

router.get('/', MessageController.getAll);
router.get('/email', MessageController.getByEmail);
router.post('/', MessageController.addMessage);

module.exports = router;