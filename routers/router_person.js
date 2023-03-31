const express = require('express');
const router = express.Router();


// controller
const {getPersons,postPersons,deletePersons} = require('../controllers/personController');



// Get all persons
router.get('',getPersons );

// Create a new person
router.post('',postPersons);

// Delete person by id 
router.delete('/:id', deletePersons);


module.exports = router