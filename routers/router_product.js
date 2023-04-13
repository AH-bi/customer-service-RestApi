const express = require('express');
const router = express.Router();

// controllers 
const {postPrdocuts,getProducts,deltePorducts,updateProductsId} = require ('../controllers/productController')


// middleware 
const {authenticateProductId}= require('../middleware/middleware')

router.get('', getProducts);
router.post('',postPrdocuts);
router.delete('/:productid',authenticateProductId,deltePorducts);
router.put('/:productid', authenticateProductId,updateProductsId)



module.exports=router