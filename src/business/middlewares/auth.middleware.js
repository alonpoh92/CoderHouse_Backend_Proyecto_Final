const logger = require('../../../utils/logger.utils');
const AuthController = require('../../controllers/api/auth.controller');
const env = require('../../../env.config');

const auth = async (req, res, next) => {
  const token = req.query[env.TOKEN_PARAMETER_NAME];
  if (req.isAuthenticated()){
    logger.info(`${req.user.email} authenticated by cookie session`);
    next();
  }else if(token){
    AuthController.jwt(req, res, next);
  }
  else {
    res.redirect('/');
  }
};

module.exports = auth;