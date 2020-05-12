const express = require('express');
const router = express.Router();

const products = [ 
    {
        name : "Red Shoes",
        price : 75
    },
    {
        name : "green Shoes",
        price : 56
    }
]

router.get('/' ,(req,res) => {
    res.render("products" , {products});
})

module.exports = router;