const { Customer,Company,Person } = require('../models/customer');
const mongoose = require ('mongoose');
const { Item,Product,Order } = require('../models/order');


 
// Update person or company
 const putCustomers = async (req, res) => {
  
  try {
        // id 
        const id = req.params.id ;
        //console.log('Customer ID:', id);
        
        if (!mongoose.Types.ObjectId.isValid(id))
        {
           //console.log('Customer not found');
         return res.status(404).json({message:'Customer not found'});
        }
      
      
        // the data to update 
        const update = req.body;
        // console.log(update)
      
      
        // try to find the document in the Company collection first
        let customer = await Company.findById(id);
        console.log('Customer not found');
        if (!customer) {
          customer = await Person.findById(id);

        }
        if (!customer) {
          return res.status(404).json({message:'Customer not found'});
          console.log('Customer not found');

        }
        
     
      // if the document is not found in the Company collection, try to find it in the Person collection
  

      // if the document is still not found, return an error

      
      // if the document is found, update it and save it to the database
      customer.phone = update.phone;
      customer.address = update.address;
      if (customer.type === 'Company') {
        customer.name = update.name;
        customer.regno = update.regno;
      } else {
        customer.firstname = update.firstname;
        customer.lastname = update.lastname;
      }

      await customer.save();
      return  res.status(200).json({ message:"Customer updated" })
  }
      catch(error)
      {
          res.status(500).json({message: "Internal Server error"})
      }
  
  }


// get all customer companies + persons 
const getCustomers = async(req,res)=>
{
	try{
	
	 const data = await Customer.find()
	 return res.status(200).json(data)
	 }
	 catch(error)
	 {
     res.status(500).json({message:"Internal server error"})
	 }
   console.log("test without return")

}



// post order for a specific customer with the id 

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
    const saveditem = await orderItem.save()
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
    
    // update the product reduce the quantity
    
    for (const item of items)
    {
      let product = await Product.findById(item.product)
      console.log(product)

      product.quantity -= item.quantity
      await product.save() 
    }
    
    return res.status(200).json({message: "Order created successfully ",orderSaved})
    
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
          for (const item of orderItems)
          {
            let deleteItem = await  Item.findByIdAndDelete(item)
            console.log(deleteItem.product)
            let product = await Product.findById(deleteItem.product)
            product.quantity += deleteItem.quantity
            await product.save()
          }
          return res.status(200).json({ message: "Order deleted successfully" });

        }
           
        catch(error)
        {
          console.log(error.message)
          return res.status(500).json({ message :"Internal server error"})
        }
  
 
}


// get the items for a specific order
const getCustomerIdOrdersIdItems = async (req,res) => {

  try
  {
    // Costumer ID

       const customerid = req.params.customerid ;
       console.log(customerid)
    // Order ID 
       const orderid = req.params.orderid ;
       console.log(orderid)

       const customerData = await Customer.findById(customerid);

       if (!customerData)
       {
        return res.status(404).json({
          message : "Customer Not found"
        })
       }

       const orderData = await Order.findById(orderid)
       
       if (!orderData)
       {
        return res.status(404).json({
          message : "Order Not found"
        })
       }

       const items = await orderData.populate('items')
       console.log(items)
       return res.status(200).json({
        message : " The items for the" , items
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

      // Costumer ID
          const customerid = req.params.customerid ;
              
      
        // Item Id
        const itemid = req.params.itemid;
        
        const customer = await Customer.findById(customerid);
        
        if (!customer)
        {
         return res.status(404).json({
           message : "Customer Not found"
          })
        }
        
        const order = await Order.findById(orderid)
        
        const deletedItem = await Item.findByIdAndDelete(itemid);
        
        const product = await Product.findById(deletedItem.product)
        product.quantity += deletedItem.quantity
        await product.save()
        
        
        res.status(200).json({message:"Item deleted successfully "})
      }

      catch(error)
      {
        res.status(500).json({message:"Internal server error"})
      }
        
      }
      
      
module.exports={putCustomers,getCustomers,postCustomerIdOrder,getCustomerIdOrders,getCustomerIdOrdersIdItems,deleteCustomerIdOrderId,deleteCustomerIdOrderIditemId}