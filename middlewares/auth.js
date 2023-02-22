const auth = (userlogged, failRedirect='/') => {
  return async (req, res, next) => {
    if(userlogged){
      if (req.isAuthenticated()) {
        next();
      }
      else {
        res.redirect(failRedirect);
      }
    }else{
      if (!req.isAuthenticated()) {
        next();
      }
      else {
        res.redirect(failRedirect);
      }
    }
  };
}
  
module.exports = auth;