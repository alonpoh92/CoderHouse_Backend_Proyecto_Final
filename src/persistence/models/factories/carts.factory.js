const CartDto = require('../dtos/cart.dto');
const { CartDao } = require('../daos/app.dao');

class CartFactory{
    constructor(){
        try{
            if(CartFactory._instance){
                throw new Error('CartFactory already has an instance!!!');
            }
            this.CartDao = new CartDao();
            CartFactory._instance = this;
        }catch(error){
            this.CartDao = CartFactory._instance.CartDao;
        }
    }

    async createCart(cartObj){
        const newCart = new CartDto("undefined", cartObj.email, [], new Date(), new Date());
        const cart = await this.CartDao.createCart(newCart);
        return new CartDto(cart.id, cart.email, cart.items, cart.createdAt, cart.updatedAt);
    }

    async getCartById(id){
        let cart = await this.CartDao.getCartById(id);
        return new CartDto(cart.id, cart.email, cart.items, cart.createdAt, cart.updatedAt);
    }
    
    async getCartByEmail(email){
        let cart = await this.CartDao.getCartByEmail(email);
        cart = cart[0];
        return new CartDto(cart.id, cart.email, cart.items, cart.createdAt, cart.updatedAt);
    }

    async updateCart(cartObj){
        const newCart = new CartDto(cartObj.id, cartObj.email, cartObj.items, cartObj.createdAt, new Date());
        const cart = await this.CartDao.updateCart(newCart);
        return new CartDto(cart.id, cart.email, cart.items, cart.createdAt, cart.updatedAt);
    }

    async deleteCartById(id){
        return await this.CartDao.deleteCartById(id);
    }
}

module.exports = CartFactory;