const formatOrderForDB = (userObj) => {
    const newCart = {
        user_id: userObj.userId,
        products: userObj.products,
        createdAt: new Date()
    };
    return newCart;
};
  
module.exports = {
    formatOrderForDB,
}