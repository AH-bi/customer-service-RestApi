const mongoose = require ('mongoose');
const { Order} = require('../models/order');
const {Product} = require ('../models/product');
const {Item} = require ('../models/item');




const updateProductQuantity = async (productId, quantity) => {
  try {
    const product = await Product.findById(productId);

    product.quantity += quantity;
    await product.save();
  } 
  catch (error) {
    console.log(error.message);
  }
};



// create order for a specific customer with the id 
const postCustomerIdOrder = async (req,res) =>
{
  try{
 
    // customer id 
    const customerId = req.params.customerid;

    // information about the order 
    const data = req.body;
      
    // the items 
      const items = data.items;
  
  if (!items || !Array.isArray(items) || items.length === 0)
  {

    return res.status(300).json({message :'Items are required'})
    
  }
  

  // the new table id's for the order document   
  const orderItems = [];
  
  for (const item of items) 
  {  
    let product = await Product.findById(item.product); 
    if (!product) {
      return res.status(404).json({ message: `Product with id ${item.product} not found` });
    }

    let productId  =  item.product

        //console.log(typeof(productId))
    const orderItem = new Item({
      product : productId,
      price: (product.price *item.quantity ),
      quantity: item.quantity
    })
    const saveditem = await orderItem.save();
    orderItems.push(saveditem._id)
  }
  // create an order instance with the new order Items
  const order = new Order(
    {
      customer : customerId,
      status:data.status,
      items:orderItems,
    }
    )
    const orderSaved = await order.save()
    
    // update the product (reduce the quantity)
    /* 
    for (const item of items)
    {
      let product = await Product.findById(item.product)
      console.log(product)
      
      product.quantity -= item.quantity
      await product.save() 
    }
    */
   // update the product (reduce the quantity)
   for (const item of items) {
    await updateProductQuantity(item.product, -item.quantity);
  }
    
    return res.status(201).json({message: "Order created successfully ",orderSaved})
    
  }
    catch(error){
      console.log(error.message)
      return res.status(500).json({ message :"Internal server error"})
  } 
}



// history of all orders for a customer with id 
const getCustomerIdOrders = async (req,res)=>
{
  try{

    const customerid = req.params.customerid
    
    

    // find orders with a specific customer id
    data = await Order.find({
       customer: customerid }
       ).lean()

    return res.status(200).json(data)
  }
  
  catch(error)
  {
    console.log(error.message)
    return res.status(500).json({ message :"Internal server error"})
  }

} 




// cancel an order  with id (delete)

const deleteCustomerIdOrderId = async (req,res) => {

  try
  {
          // Order ID 
          const orderid = req.params.orderid ;
          const order = await Order.findByIdAndDelete(orderid)
      
          // Delete the items and return the quantity to the product  
          orderItems = order.items 
          
          /*for (const item of orderItems)
          {
            let deleteItem = await  Item.findByIdAndDelete(item)
            console.log(deleteItem.product)
            let product = await Product.findById(deleteItem.product)
            product.quantity += deleteItem.quantity
            await product.save()
          }
          */


          // update the product (reduce the quantity)
          for (const item of orderItems) {
            let deleteItem = await Item.findByIdAndDelete(item);
            await updateProductQuantity(deleteItem.product, deleteItem.quantity);
          }
          return res.status(204).json({ message: "Order deleted successfully" });

        }
           
        catch(error)
        {
          console.log(error.message)
          return res.status(500).json({ message :"Internal server error"})
        }
  
 
}



module.exports = {postCustomerIdOrder,getCustomerIdOrders,deleteCustomerIdOrderId,updateProductQuantity}