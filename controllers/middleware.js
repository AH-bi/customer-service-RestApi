// mongoose 
const mongoose = require ("mongoose")

// models 

const { Item,Product,Order } = require('../models/order');
const { Customer,Company,Person } = require('../models/customer');

const validateOrderId = async (req,res,next)=>{

    const orderId = req.params.orderid;
    if (!mongoose.isValidObjectId(orderId)) {
        return res.status(404).json({ message: "Order ID invalid" });
      }

      req.order = await Order.findById(orderId)
     if(!req.order)
     {
        return res.status(404).json({ message: "Order ID not found" });
     } 
      next();


}

const authenticateCustomerId = async (req,res,next) =>
{
    const customerId = req.params.customerid

    if(!mongoose.isValidObjectId(customerId))
    {
        console.log("test")

        return res.status(404).json({message: "Customer ID invalid"})
    }
     req.customer= await Customer.findById(customerId)
    if(!req.customer)
    {
        console.log("test")
        res.status(404).json({
            message:  "Customer ID not found"
        })
    }
    next()
}


const authenticateCustomerOrder = async(req,res,next)=>
{
    const order = req.order;
    if (req.params.customerid !== order.customer.toString()) {
        return res.status(400).json({ message: "Unauthorized" });
      }
      next();

}

module.exports = { validateOrderId ,authenticateCustomerId,authenticateCustomerOrder};
