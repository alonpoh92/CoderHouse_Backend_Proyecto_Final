const express = require('express');
const multer = require('multer');
const path = require('path');

const authControllers = require('../../../controllers/auth.controller');
const passport = require('../../../middlewares/passport');

const router = express.Router();

router.post(
    '/register', multer().single('userAvatar'), 
    passport.authenticate('signup', {
        failureRedirect: '/',
    }), authControllers.register
);

router.post(
    '/login',
    passport.authenticate('signin', {
        failureRedirect: '/',
    }), authControllers.login
);

router.get('*', (req, res) => {
    res.redirect('/');
});

module.exports = router;