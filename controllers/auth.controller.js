const register = (req, res, next) => res.redirect('/');

const login = (req, res, next) => res.redirect('/') ;

module.exports = {
  login,
  register,
}