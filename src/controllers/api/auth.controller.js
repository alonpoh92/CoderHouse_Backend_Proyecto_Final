const jwt = require('jsonwebtoken');
const passport = require('../../business/middlewares/passport.middleware');
const { successResponse, errorResponse } = require('../../../utils/api.utils');
const logger = require('../../../utils/logger.utils');
const env = require('../../../env.config');

class AuthController{
  signup = (req, res, next) => {
    passport.authenticate('signup', (err, user, info) => {
      if(err) {
        return res.json(errorResponse(err.message || err));
      }
      if(!user) {
        return res.json(errorResponse('User registration fail'));
      }
      req.login(user, loginErr => {
        if (loginErr) {
          return res.json(errorResponse(loginErr));
        }
        const token = jwt.sign(JSON.stringify({id: user.id, email: user.email}), env.TOKEN_SECRET);
        return res.json(successResponse({message : 'User registration successfull', token }));
      }); 
    })(req, res, next)
  };
  signin = (req, res, next) => {
    passport.authenticate('signin', (err, user, info) => {
      if(err){
        return res.json(errorResponse(err.message || err));
      }
      if(!user){
        return res.json(errorResponse('Invalid user or password'));
      }
      req.login(user, loginErr => {
        if (loginErr) {
          return res.json(errorResponse(loginErr));
        }
        const token = jwt.sign(JSON.stringify({id: user.id, email: user.email}), env.TOKEN_SECRET);
        return res.json(successResponse({message : `${user.email} has logged in successfully`, token}));
      }); 
    })(req, res, next)
  };
  jwt = (req, res, next) => {
    passport.authenticate('jwt', (err, user, info) => {
      if(err){
        return res.json({error:(err.message || err)});
      }
      if(!user){
        return res.json({error: 'Invalid user'});
      }
      req.user = user;      
      logger.info(`${user.email} authenticated by token`);
      return next();
    })(req, res, next)
  };
  logout = (req, res) => {
    const user = req.user;
    req.logOut((done) => {
      logger.info(`${user.email} has logged out`);
      res.json(successResponse());
    });
  }
}

module.exports = new AuthController();