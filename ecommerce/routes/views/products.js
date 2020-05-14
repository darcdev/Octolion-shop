const express = require('express');
const router = express.Router();
const productsService = require('../../services/products');

router.get('/' ,async (req,res,next) => {
    console.log(req.params)

    const { tags } = req.query
    try{
        const products = await productsService.getProducts({tags})
        res.render("products" , {products});
    }
    catch(e) {
        next(e)
    }
})

module.exports = router;