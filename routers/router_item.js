const express = require('express');

const router = express.Router()



// middleware
const {validateOrderId,authenticateCustomerId,authenticateCustomerOrder,validateItemId }= require('../middleware/middleware')

// item controller 
const {getCustomerIdOrdersIdItems,deleteCustomerIdOrderIditemId,updateCustomerIdOrdersIdItemsId,postCustomerIdOrdersId}= require('../controllers/itemController')



// items related endpoints

router.post('/:customerid/orders/:orderid/items',authenticateCustomerId,validateOrderId,postCustomerIdOrdersId)

router.get('/:customerid/orders/:orderid/items',authenticateCustomerId,validateOrderId,getCustomerIdOrdersIdItems)
router.delete('/:customerid/orders/:orderid/items/:itemid',authenticateCustomerId,validateOrderId,authenticateCustomerOrder,deleteCustomerIdOrderIditemId)




router.put('/:customerid/orders/:orderid/items/:itemid',authenticateCustomerId,validateOrderId,authenticateCustomerOrder,validateItemId,updateCustomerIdOrdersIdItemsId)

module.exports= router