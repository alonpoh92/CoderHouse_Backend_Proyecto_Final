const express = require('express');
const path = require('path');

const apiRoutes = require('./api/api.routes');

const router = express.Router();

router.use('/api', apiRoutes);

router.get('/', async (req, res) => {
const user = await req.session.user;
  if (user) {
    return res.redirect('/profile');
  }
  else {
    return res.sendFile(path.resolve(__dirname, '../public/login.html'));
  }
});


module.exports = router;