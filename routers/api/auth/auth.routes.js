const express = require('express');
const path = require('path');

const authControllers = require('../../../controllers/auth.controller');
const passport = require('../../../middlewares/passport');

const router = express.Router();

router.post(
    '/register',
    passport.authenticate('signup', {
        failureRedirect: '/signup-error'
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