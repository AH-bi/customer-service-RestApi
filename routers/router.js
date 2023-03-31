const express = require('express');
const router = express.Router();

// models 
const {Product,Order,Item}= require('../models/order')



router.get('/orders/:id/items', async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId).populate('items');

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({ items: order.items });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

 

module.exports = router

