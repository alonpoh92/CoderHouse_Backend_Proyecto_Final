const express = require('express');
const multer = require('multer');
const path = require('path');

const authControllers = require('../../../controllers/auth.controller');
const authMiddleware = require('../../../middlewares/auth');
const passport = require('../../../middlewares/passport');
const logger = require('../../../utils/logger.utils');

const router = express.Router();

router.post(
    '/register', multer().single('userAvatar'), 
    passport.authenticate('signup', {
        failureRedirect: '/signup-error',
    }), authControllers.register
);

router.post(
    '/login',
    passport.authenticate('signin', {
        failureRedirect: '/signin-error',
    }), authControllers.login
);

router.get('/logout', authMiddleware('/'), (req, res) => {
    const user = req.user.email;
    req.logout({}, (err) => {
        req.session.destroy((err) => {
          res.clearCookie('connect.sid');
          logger.info(`User ${user} has logged out`);
          res.redirect('/');
        });
    });
  });

router.get('*', (req, res) => {
    res.redirect('/');
});

module.exports = router;