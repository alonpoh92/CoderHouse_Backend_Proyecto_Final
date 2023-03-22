const express = require('express');
const AuthController = require('../../../controllers/api/auth.controller');

const router = express.Router();

router.post('/register', AuthController.signup);
router.post('/login', AuthController.signin);
router.post('/logout', AuthController.logout);

module.exports = router;