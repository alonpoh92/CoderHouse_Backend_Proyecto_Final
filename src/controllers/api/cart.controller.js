const CartFactory = require('../../persistence/models/factories/carts.factory');
const { successResponse, errorResponse } = require('../../../utils/api.utils');

const Factory = new CartFactory();

class CartController{
    getById = async(req, res) => {
        const {id} = req.params;
        try{
            const order = await Factory.getCartById(id);
            res.json(successResponse(order));
        }catch(error){
            res.json(errorResponse(error.message, error.details));
        }
    };

    addToCart = async(req, res) => {
        const {id} = req.params;
        const {productId, qty} = req.body;
        if(productId && Number(qty)){
            try{
                const oldCart = await Factory.getCartById(id);
                let exist = false;
                let items = oldCart.items;
                if(items.length > 0){
                    items.map(item => {
                        if(item.id == productId){
                            item.qty += Number(qty);
                            exist = true;
                        }
                    });
                }
                if(!exist){
                    items.push({id: productId, qty});
                }
                const cart = await Factory.updateCart({id: oldCart.id, email: oldCart.email, items, createdAt: oldCart.createdAt});
                res.json(successResponse(cart));
            }catch(error){
                res.json(errorResponse(error.message, error.details));
            }
        }else{
            const message = "Not valid or incomplete data"
            res.json(errorResponse(message));
        }
    };

    updateCart = async(req, res) => {
        const {id} = req.params;
        const {items} = req.body;
        if(items){
            try{
                const oldCart = await Factory.getCartById(id);
                const cart = await Factory.updateCart({id: oldCart.id, email: oldCart.email, items: JSON.parse(items), createdAt: oldCart.createdAt});
                res.json(successResponse(cart));
            }catch(error){
                res.json(errorResponse(error.message, error.details));
            }
        }else{
            const message = "Not valid or incomplete data"
            res.json(errorResponse(message));
        }
    };
}

module.exports = new CartController();