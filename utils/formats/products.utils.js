const formatProductForDB = (userObj) => {
    const newProduct = {
        name: userObj.name.trim().toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
        description: userObj.description.trim().toLowerCase().replace(/(^\w{1})/g, letter => letter.toUpperCase()),
        code: userObj.code.trim().toLowerCase(),
        photo: "default.png",
        price: userObj.price,
        stock: userObj.stock,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    return newProduct;
  };
  
  module.exports = {
    formatProductForDB,
  }