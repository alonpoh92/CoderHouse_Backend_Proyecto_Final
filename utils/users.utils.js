const moment = require('moment');

const formatUserForDB = (userObj) => {
  const newUser = {
    email: userObj.email.trim().toLowerCase(),
    password: userObj.password.trim(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  return newUser;
};

module.exports = {
  formatUserForDB,
}