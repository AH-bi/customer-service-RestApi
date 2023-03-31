const mongoose = require('mongoose');

// customer schema 
const customerSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
}, { discriminatorKey: 'type' });



// company schema 
const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  regno: {
    type: String,
    required: true,
  },
});


// person schema 
const personSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
});

const Customer = mongoose.model('Customer', customerSchema);

const Company = Customer.discriminator('Company', companySchema);

const Person = Customer.discriminator('Person', personSchema);

module.exports = { Customer, Company, Person };
