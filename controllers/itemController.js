
const {Item} = require ('../models/item');
const { Order} = require('../models/order');
const {Product} = require ('../models/product');
const {updateProductQuantity} = require('./orderController')

// get the items for a specific order
const getCustomerIdOrdersIdItems = async (req,res) => {

    try
    {
         // Order ID 

         const orderid = req.params.orderid ;
         console.log(orderid)
  
  
         const orderData = await Order.findById(orderid)
         
  
         const items = await orderData.populate('items')
         console.log(items)
         return res.status(200).json({
          message : items
         })
  
   
    }
    catch(error)
    {
      console.log(error.message)
      return res.status(500).json({ message :"Internal server error"})
    }
  }
  
  
  // delete item by id for a specific order
  const deleteCustomerIdOrderIditemId = async (req,res) =>
    {
      try{

        console.log("test")
  
          // Order ID
          const orderid = req.params.orderid ;
                
        
          // Item Id
          const itemid = req.params.itemid;
          
          
                
          const deletedItem = await Item.findByIdAndDelete(itemid);
          
          
          updateProductQuantity(deletedItem.product,deletedItem.quantity)
          
          res.status(200).json({message:"Item deleted successfully "})
        }
  
        catch(error)
        {
          console.log("test")
          res.status(500).json({message:"Internal server error"})
        }
          
        }
        
  

// create  items for a specifc order


const postCustomerIdOrdersId = async (req,res) =>
{

  //const data= 
  try
  {
    // order from the middleware
    order=req.order;
    

    const itemData = req.body.items
    
    // product 
    const product = await Product.findById(itemData.product)

    if (!product)
    {
      return res.status(404).json({message:"Product not found"});
    }

    const item = new Item({
      product : product._id,
      price : product.price * itemData.quantity,
      quantity : itemData.quantity
    })
    const savedItem = await item.save()

    // reduce the product quantity 
    updateProductQuantity(product._id,savedItem.quantity)
    order.items.push(savedItem._id)  
    await order.save()

    return res.status(201).json({message:"Item create successfully"})
    
  }
    catch(error)
    {
      return res.status(500).json({
        message : "Internal sever error"
      })
    }
}


// update  items for a specifc order 
const updateCustomerIdOrdersIdItemsId = async (req,res) =>{
  try
  {
  console.log("test")
    
    const updatedQuantity = req.body.quantity;
    
    const item = req.item;
    console.log(item)
    
    //quantity difference
    const quantityDifference = updatedQuantity - item.quantity
    item.quantity = updatedQuantity
    
    updateProductQuantity(item.product,-quantityDifference)
    await item.save() ;
    return res.status(200).json({
      message : "Item updated Successfully"
    })
  }

  catch (error)
  {
    console.log(error.message)
    res.status(500).json({
      message: "Internal server error "
    })
  }
  
  
}


module.exports={getCustomerIdOrdersIdItems,deleteCustomerIdOrderIditemId,updateCustomerIdOrdersIdItemsId,postCustomerIdOrdersId}