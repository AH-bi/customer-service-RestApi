const express = require('express');
const router = express.Router();

// middleware
const {validateOrderId,authenticateCustomerId,authenticateCustomerOrder }= require('../controllers/middleware')

// customers controller 
const {putCustomers,getCustomers,postCustomerIdOrder,getCustomerIdOrders,getCustomerIdOrdersIdItems,deleteCustomerIdOrderId,deleteCustomerIdOrderIditemId}= require('../controllers/customerController')


// update by the customers 
router.put('/:id', putCustomers)

// get  all customers 
router.get('',getCustomers)	 


// orders related endpoints
router.get('/:customerid/orders/',authenticateCustomerId,getCustomerIdOrders)

router.post('/:id/orders/',)
router.post('/:customerid/orders/',authenticateCustomerId,postCustomerIdOrder)
router.delete('/:customerid/orders/:orderid',authenticateCustomerId, validateOrderId,authenticateCustomerOrder,deleteCustomerIdOrderId)


// items related endpoints
router.get('/:customerid/orders/:orderid/items',getCustomerIdOrdersIdItems)

router.delete('/:customerid/orders/:orderid/items/:itemid',deleteCustomerIdOrderIditemId)




module.exports = router