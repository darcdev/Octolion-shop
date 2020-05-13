const express = require('express');
const router = express.Router();
const productMock  = require('../../utils/products');

router.get('/' , (req,res) => {
    const { query } = req;
    res.status(200).json({
        data : productMock,
        message : 'products listed'
    })
})
router.get('/:productId' , (req,res) => {
    const { productId } =  req.params;

    res.status(200).json({
        data : productMock[0],
        message : 'product retrieved'
    })
})
router.post('/' , (req,res) => {
    res.status(200).json({
        data : productMock[0],
        message : 'product created'
    })
})
router.put('/:productId' , (req,res) => {
    res.status(200).json({
        data : productMock[0],
        message : 'product modified'
    })
})
router.delete('/:productId' , (req,res) => {
    res.status(200).json({
        data : productMock[0],
        message : 'products delete'
    })
})

module.exports = router;