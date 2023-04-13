const express = require('express');

const router = express.Router();

const {validateOrderId,authenticateCustomerId,authenticateCustomerOrder }= require('../middleware/middleware')


// orders controller
const {postCustomerIdOrder,getCustomerIdOrders,deleteCustomerIdOrderId}= require('../controllers/orderController')



// orders related endpoints
router.get('/:customerid/orders/',authenticateCustomerId,getCustomerIdOrders)

router.post('/:id/orders/',)
router.post('/:customerid/orders/',authenticateCustomerId,postCustomerIdOrder)
router.delete('/:customerid/orders/:orderid',authenticateCustomerId, validateOrderId,authenticateCustomerOrder,deleteCustomerIdOrderId)




module.exports= router