const cartsController = require('./carts.controller');

class NavBarController{
    async getQtyProducts(userId){
        const cart = await cartsController.getCartByUserId(userId);
        let qty = 0;
        if(cart.length > 0){
            cart[0].products.map((product) => {qty += product.qty})
        }
        return(qty);
    }
};

module.exports = new NavBarController();