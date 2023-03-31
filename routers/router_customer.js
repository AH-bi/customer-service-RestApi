const express = require('express');
const router = express.Router();

const {Customer} = require('../models/customer')
const {Product,Order,Item}= require('../models/order')

// customers controller 
const {putCustomers,getCustomers}= require('../controllers/customerController')




// update by the customers 
router.put('/:id', putCustomers)


// get  all customers 

router.get('',getCustomers)	 




// orders related stuff


		
// test
router.post('/:id/orders/', async (req, res) => {
  try {
    const customerId = req.params.id;
    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const items = req.body.items;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Items are required and must be an array" });
    }

    const orderItems = [];

    // Create an Item instance for each item in the items array
    for (const item of items) {
      const product = await Product.findById(item.product);

      if (!product) {
         res.status(404).json({ message: `Product with id ${item.product} not found` });
      }

      const orderItem = new Item({
        product: item.product,
        price: product.price,
        quantity: item.quantity,
      });

      orderItems.push(orderItem);
    }

    // Create an Order instance and add the items to it
    const order = new Order({
      customer: customerId,
      items: orderItems,
    });

    const savedOrder = await order.save();

    // Update product quantities
    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      product.quantity -= item.quantity;
      await product.save();
    }

    return res.status(200).json({ message: "Order was created successfully", data: savedOrder });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});




module.exports = router