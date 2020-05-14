const express = require('express');
const router = express.Router();
const productsService  = require('../../services/products');

router.get('/' , async (req,res,next) => {
    const { tags } = req.query;
    try{
        const getProducts = await productsService.getProducts({tags})
        res.status(200).json({
            data : getProducts,
            message : 'products listed'
        })
    }
    catch(e){
        next(e)
    }
})
router.get('/:productId' , async (req,res,next) => {
    const { productId } =  req.params;
    try{
        const getProduct = await productsService.getProducts({productId})
        res.status(200).json({
            data : getProduct,
            message : 'product retrieved'
        })
    }
    catch(e){
        next(e);
    }
})
router.post('/' , async (req,res,next) => {
    const {body:product} = req;
    try{
        const createProduct = await productsService.createProduct({product})

    res.status(200).json({
        data : createProduct,
        message : 'product created'
    })
    }
    catch(e){
        next(e);
    }
})
router.put('/:productId' , async (req,res,next) => {
    const {productId} = req.params;
    const {body:product} = req;
    try{
        const updateProduct = await productsService.updateProduct({productId , product});

    res.status(200).json({
        data : updateProduct,
        message : 'product modified'
    })
    }
    catch(e){
        next(e);
    }
})
router.patch('/:productId', async (req,res,next) => {
    const {productId} = req.params;
    const {body:product}  = req;
    try{
        const pathProduct = await productsService.patchProduct({productId , product})
        res.status(200).json({
            data  : pathProduct,
            message : 'product modified'
        })
    }
    catch(e){
        next(e);
    }
})
router.delete('/:productId' , async (req,res,next) => {
    const { productId } = req.params;
    try{
        const deleteProduct = await productsService.deleteProduct({productId});
        res.status(200).json({
            data : deleteProduct,
            message : 'products delete'
        })
    }
    catch(e){
        next(e);
    }
})

module.exports = router;