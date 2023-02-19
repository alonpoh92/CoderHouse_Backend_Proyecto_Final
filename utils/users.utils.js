const moment = require('moment');

const formatUserForDB = (userObj) => {
  const newUser = {
    email: userObj.email.trim().toLowerCase(),
    password: userObj.password.trim(),
    name: userObj.name.trim().toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
    phone: userObj.phone,
    address: userObj.address,
    age: userObj.age,
    avatar: "default.png",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  return newUser;
};

module.exports = {
  formatUserForDB,
}