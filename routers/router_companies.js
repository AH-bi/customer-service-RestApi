const express = require('express');
const router = express.Router();


// company controller
const {getCompanies,postCompanies,deleteCompanies} = require('../controllers/companyController');



// Get all companies
router.get('', getCompanies);

// Create a new company
router.post('',postCompanies);

// delete company by id 
router.delete('/:id',deleteCompanies );



module.exports = router