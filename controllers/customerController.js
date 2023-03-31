const { Customer } = require('../models/customer');



const putCustomers = async (req, res) => {
  
  try {
      
      const update = req.body;
      const id = req.params.id;

      // try to find the document in the Company collection first
      let customer = await Company.findById(id);
  
      // if the document is not found in the Company collection, try to find it in the Person collection
      if (!customer) {
        customer = await Person.findById(id);
      }
  
      // if the document is still not found, return an error
      if (!customer) {
        return res.status(404).send('Customer not found');
      }
  
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
      
      return res.status(200).json({ message:" Customer updated" })
  
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
	 
	 res.status(200).json(data)
	 }
	 catch(error)
	 {
	 res.status(500).json({message:"Internal server error"})
	 }
 
}


module.exports={putCustomers,getCustomers}