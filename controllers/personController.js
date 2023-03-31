const {Person} = require('../models/customer');


const getPersons = async (req, res) => {
    try {
      const persons = await Person.find();
      
      res.status(200).json(persons);

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };



  // post method

 const postPersons = async (req, res) => {
  try {
    const { firstname, lastname, phone, address } = req.body;
    

    // Create a new customer document
    const customer = new Person({
      firstname,
      lastname,
      phone,
      address,
    });

    // Save the new customer document to the database
    await customer.save();

    res.status(200).json({ message: 'Person created successfully', customer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}


 const deletePersons=async (req, res) => { 
  
  try {
            const id  = req.params.id
            // delete a customer by id 
            await Person.findByIdAndDelete(id)
            res.status(204).json({message:'Person delted successfully'});
      
      } 
  catch (error) {
          console.error(error);
          res.status(404).json({ message: 'Person Not found' });
        }
}


  module.exports = {getPersons, postPersons,deletePersons}
