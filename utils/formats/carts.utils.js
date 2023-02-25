const formatCartForDB = (userObj) => {
    const newCart = {
        user_id: userObj.userId,
        products: [],
        createdAt: new Date(),
        updatedAt: new Date()
    };
    return newCart;
  };
  
  module.exports = {
    formatCartForDB,
  }