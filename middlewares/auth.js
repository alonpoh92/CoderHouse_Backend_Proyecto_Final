const auth = (failRedirect='/') => {
  return async (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    }
    else {
      res.redirect(failRedirect);
    }
  };
}
  
module.exports = auth;