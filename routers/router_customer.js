const express = require('express');
const router = express.Router();

// middleware
const {validateOrderId,authenticateCustomerId,authenticateCustomerOrder }= require('../middleware/middleware')

// customers controller 
const {putCustomers,getCustomers}= require('../controllers/customerController')





// update by the customers 
router.put('/:id', putCustomers)

// get  all customers 
router.get('',getCustomers)	 





module.exports = router