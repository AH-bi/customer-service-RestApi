const mongoose = require ('mongoose')

const Schema = mongoose.Schema

// order schema 
const orderSchema= new Schema(
	
		{
		 customer: 
		 	{	// constraint 
		 		type: Schema.Types.ObjectId,
		 	 	ref: 'Customer',
		 	 	required: true
		 	  },
				 	  
		date: {
		    type: Date,
		    default: Date.now,
		  },
		status: {
		    type: String,
		    required: true,
		    enum: ['pending', 'cancelled', 'completed'],
		    default: 'pending',
		  },
 		 items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }]
		}

)



// order model
const Order = mongoose.model('Order' ,orderSchema)


module.exports={Order}
