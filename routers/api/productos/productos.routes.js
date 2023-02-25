const express = require('express');
const {ProductsController} = require('../../../controllers/products.controller');

const router = express.Router();

function noAdminRouteError(req){
    return {error: -1, description: `path '${req.originalUrl}' method '${req.method}' not authorized`}
}

function isAdmin(admin){
    try{
        if(admin.toLowerCase() == 'true'){
            return true;
        }else{
            return false;
        }
    }catch(e){
        return false;
    }
}

/*router.get('/', async (req, res) => {
    const data = await products.getAllProducts();
    if(!data.error){
        res.status(200).json(data);
    }else{
        res.status(400).json(data);
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const data = await products.getProductById(id);
    if(!data.error){
        res.status(200).json(data);
    }else{
        res.status(400).json(data);
    }
});

router.post('/', async (req, res) => {
    const { name, description, code, photo, price, stock, administrador } = req.body;
    if(isAdmin(administrador)){
        if(name.trim() && description.trim() && code.trim() && photo.trim() && Number(price.trim()) && Number(stock.trim())){
            const newProduct = new Product(undefined, name.trim(), description.trim(), code.trim(), photo.trim(), Number(price.trim()), Number(stock.trim()));
            const data = await products.addNewProduct(newProduct);
            if(!data.error){
                res.status(200).json({data: newProduct, error: null});
            }else{
                res.status(400).json(data);
            }
        }else{
            res.status(400).json({data: null, error: 'Incomplete or invalid information'});
        }
    }else{
        res.status(400).json({data: null, error: noAdminRouteError(req)});
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    body.price = Number(body.price);
    body.stock = Number(body.stock);
    if(isAdmin(body.administrador)){
        let data = await products.getProductById(id);
        if(!data.error){
            if(body.name || body.description || body.code || body.photo || body.price || body.stock){
                const product = data.data;
                const updatedProduct = {};
                for(let key of Object.keys(product)){
                    if(body[key]){
                        updatedProduct[key] = body[key];
                    }else{
                        updatedProduct[key] = product[key];
                    }
                }
                data = await products.deleteProductById(id);
                if(!data.error){
                    data = await products.addNewProduct(updatedProduct);
                    if(!data.error){
                        data.data = updatedProduct;
                        res.status(200).json(data);
                    }else{
                        res.status(400).json(data);
                    }
                }else{
                    res.status(400).json(data);
                }
            }else{
                res.status(400).json({data: null, error: 'Incomplete or invalid information'});
            }
        }else{
            res.status(400).json(data);
        }
    }else{
        res.status(200).json({data: null, error: noAdminRouteError(req)});
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    if(isAdmin(body.administrador)){
        let data = await products.getProductById(id);
        if(!data.error){
            data = await products.deleteProductById(id);
            if(!data.error){
                res.status(200).json(data);
            }else{
                res.status(400).json(data);
            }
        }else{
            res.status(400).json(data);
        }
    }else{
        res.status(200).json({data: null, error: noAdminRouteError(req)});
    }
});*/

module.exports = router;