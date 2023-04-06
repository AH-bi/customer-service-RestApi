const express = require('express');
const router = express.Router();

// controllers 
const {postPrdocuts,getProducts,deltePorducts,updateProductsId} = require ('../controllers/productController')


router.get('', getProducts);
router.post('',postPrdocuts);
router.delete('/:id',deltePorducts);
router.put('/:productid', updateProductsId)



module.exports=router