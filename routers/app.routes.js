const express = require('express');
const path = require('path');

const authMiddleware = require('../middlewares/auth');
const apiRoutes = require('./api/api.routes');

const router = express.Router();

router.use('/api', apiRoutes);

router.get('/', authMiddleware('/login'), async (req, res) => {
  return res.render('test');
});

router.get('/login', (req, res) => {
  return res.sendFile(path.resolve(__dirname, '../public/login.html'));
});

router.get('/signin-error', (req, res) => {
  return res.render('signin-error', {layout: false});
});

router.get('/signup-error', (req, res) => {
  return res.render('signup-error', {layout: false});
});


module.exports = router;