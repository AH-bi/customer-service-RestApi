const express = require('express');
const router = express.Router();

// controllers 
const {postPrdocuts,getProducts,deltePorducts} = require ('../controllers/productController')


router.get('', getProducts);
router.post('',postPrdocuts);
router.delete('/:id',deltePorducts);



module.exports=router