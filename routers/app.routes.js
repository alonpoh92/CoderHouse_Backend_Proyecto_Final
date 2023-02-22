const express = require('express');
const path = require('path');

const authMiddleware = require('../middlewares/auth');
const apiRoutes = require('./api/api.routes');

const router = express.Router();

router.use('/api', apiRoutes);

router.get('/', authMiddleware('/login'), async (req, res) => {
  const data = req.user;
  data.qtyItems = 2;
  data.hasItems = data.qtyItems > 0;
  return res.render('test', data);
});

router.get('/login', (req, res) => {
  return res.sendFile(path.resolve(__dirname, '../public/login.html'));
});

router.get('/profile', (req, res) => {
  const data = req.user;
  data.qtyItems = 0;
  data.hasItems = data.qtyItems > 0;
  return res.render('profile', data);
});

router.get('/signin-error', (req, res) => {
  return res.render('signin-error', {layout: false});
});

router.get('/signup-error', (req, res) => {
  return res.render('signup-error', {layout: false});
});


module.exports = router;