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



const postCustomerIdOrder = async (req,res) =>
{
  try{
    // console.log("test")

    /*
    if (!mongoose.Types.ObjectId.isValid(customerId))
    {
      return res.status(404).json({message:'Customer not found'});
    }
    */
    const customerId = req.params.id;
    const customer = await Customer.findById(customerId);
    if (!customer) {
    return res.status(404).json({ message: "Customer not found" });
  }

  // the items 
  const items = req.body.items;
  // information about the order 
  const data = req.body;
  
  if (!items || !Array.isArray(items) || items.length === 0)
  {
    return res.status(300).json({message :'Items are required'})
    
  }
  
  const orderItems = [];
  for (const item of items) 
  {
    
    const product = await Product.findById(item.product);
    
    if (!product) {
      return res.status(404).json({ message: `Product with id ${item.product} not found` });
    }
    let productId  =   item.product
      
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
    
    for (const item of orderItems)
    {
      const product = await Product.findById(item.product)
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



// history of all orders 
const getCustomerIdOrders = async (req,res)=>
{
  try{

    const customerid = req.params.id
    
    

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







module.exports={putCustomers,getCustomers,postCustomerIdOrder,getCustomerIdOrders}