const { Customer,Company,Person } = require('../models/customer');
const mongoose = require ('mongoose');
 
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


      
module.exports={putCustomers,getCustomers}