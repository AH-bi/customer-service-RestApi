const { Company } = require('../models/customer');

const getCompanies = async (req, res) => {
  try {

    const companies = await Company.find();
    
    res.status(200).json(companies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// Post method 
const postCompanies = async (req, res) => {
  try {
    const { name, regno, phone, address,z } = req.body;
  
    // Create a new customer document
    const customer = new Company({
      name,
      regno,
      phone,
      address,
    });

    // Save the new customer document to the database
    await customer.save();

    res.status(200).json({ message: 'Company created successfully', customer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const deleteCompanies= async (req, res) => {
  try {

      const id  = req.params.id
      console.log(id)
      // delete a customer by id 
      await Company.findByIdAndDelete(id);
      res.status(200).json({message:'Company delted successfully'});

} catch (error) {
console.error(error);
res.status(404).json({ message: 'Company Not found' });
}
}

module.exports = {getCompanies,postCompanies,deleteCompanies}
