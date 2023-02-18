const express = require('express');
const {CartsController} = require('../../../controllers/carts.controller');
const {ProductsController} = require('../../../controllers/products.controller');
const {Cart} = require('../../../models/classes/Cart');

const router = express.Router();

const carts = new CartsController();
const productsList = new ProductsController();

router.post('/', async (req, res) => {
    const { products } = req.body;
    if(products){
        const productsIds = products.substring(1, products.length - 1).split(',');
        let newProducts = [];
        for(let x=0; x<productsIds.length; x++){
            const data = await productsList.getProductById(productsIds[x].trim());
            if(!data.error){
                newProducts.push(data.data);
            }
        }
        const newCart = new Cart(undefined, newProducts);
        const data = await carts.addNewCart(newCart);
        if(!data.error){
            res.status(200).json({data: newCart, error: null});
        }else{
            res.status(400).json(data);
        }
    }else{
        res.status(400).json({data: null, error: 'Incomplete or invalid information'});
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    let data = await carts.getCartById(id);
    if(!data.error){
        data = await carts.deleteCartById(id);
        if(!data.error){
            res.status(200).json(data);
        }else{
            res.status(400).json(data);
        }
    }else{
        res.status(400).json(data);
    }
});

router.get('/:id/products', async (req, res) => {
    const { id } = req.params;
    const data = await carts.getCartById(id);
    if(!data.error){
        data.data = data.data.products;
        res.status(200).json(data);
    }else{
        res.status(400).json(data);
    }
});

router.post('/:id/products', async (req, res) => {
    const { id } = req.params;
    const { product } = req.body;
    if(product){
        const oldData = await carts.getCartById(id);
        if(!oldData.error){
            let products = oldData.data.products;
            const data = await productsList.getProductById(product);
            if(!data.error){
                products.push(data.data);
                let newData = oldData.data;
                newData.products = products;
                const removeData = await carts.deleteCartById(id);
                if(!removeData.error){
                    const saveData = await carts.addNewCart(newData);
                    if(!saveData.error){
                        res.status(200).json({data: newData, error: null});
                    }else{
                        res.status(400).json(saveData);
                    }
                }else{
                    res.status(400).json(removeData);
                }
            }else{
                res.status(400).json(data);
            }
        }else{
            res.status(400).json(oldData);
        }
    }else{
        res.status(400).json({data: null, error: 'Incomplete or invalid information'});
    }
});

router.delete('/:id/products/:id_prod', async (req, res) => {
    const { id, id_prod } = req.params;
    const oldData = await carts.getCartById(id);
    if(!oldData.error){
        const products = oldData.data.products.filter(product => product.id != id_prod);
        let newData = oldData.data;
        newData.products = products;
        const removeData = await carts.deleteCartById(id);
        if(!removeData.error){
            const saveData = await carts.addNewCart(newData);
            if(!saveData.error){
                res.status(200).json({data: newData, error: null});
            }else{
                res.status(400).json(saveData);
            }
        }else{
            res.status(400).json(removeData);
        }
    }else{
        res.status(400).json(oldData);
    }
});

module.exports = router;