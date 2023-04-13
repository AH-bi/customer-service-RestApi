// mongoose 
const mongoose = require ("mongoose")

// models 

const { Order} = require('../models/order');
const {Product} = require ('../models/product');
const {Item} = require ('../models/item');
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


const validateItemId = async (req,res,next)=>
{
    const itemId = req.params.itemid ; 
    console.log(mongoose.isValidObjectId(itemId))
    if (!mongoose.isValidObjectId(itemId)) {
        return res.status(404).json({ message: "Item ID invalid" });
      }

      req.item =  await Item.findById(itemId)
     if(!req.item)
     {
        return res.status(404).json({ message: "Item ID not found" });
     } 
     console.log(req.item)
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
        return res.status(404).json({
            message:  "Customer ID not found"
        })
    }
    next()
}


const authenticateCustomerOrder = async(req,res,next)=>
{
    const order = req.order;
    if (req.params.customerid !== order.customer.toString()) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      next();

}

const authenticateProductId = async (req,res,next) =>
{
    const ProductId = req.params.productid

    if(!mongoose.isValidObjectId(ProductId))
    {
        console.log("test")

        return res.status(404).json({message: "Product ID invalid"})
    }
     req.product= await Product.findById(ProductId)
    if(!req.product)
    {
        console.log("test")
        return res.status(404).json({
            message:  "Product ID not found"
        })
    }
    next()
}
 

/*
const authenticateItemOrder = async(req,res,next)=>
{
    const customerId = req.params.customerid ; 
    ()

}
*/

module.exports = { validateOrderId ,authenticateCustomerId,authenticateCustomerOrder,validateItemId,authenticateProductId};
