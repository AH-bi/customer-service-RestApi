const mongoose = require ('mongoose')

const Schema = mongoose.Schema


// product shema 
const productSchema = new Schema ({

	 	name: 
	 	{
	 		type: String,
	 		required: true,
	 	}
	 	
	 	,price :
	 	{
	 	 	type: Number ,
	 	 	required: true,
	 	}
	 	
	 	,quantity:
	 	{
	 	
	 			type: Number,
	 			required: true,	
	 	}
	 	
})









// item schema 
const itemSchema= new Schema(
	{
	 product: 
		{
			type: Schema.Types.ObjectId,
			ref :'Product',
			required: true
		}
	,price : Number,
	quantity: Number 
	}
)




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



// product model
const Product = mongoose.model('Product',productSchema)


// order model
const Order = mongoose.model('Order' ,orderSchema)

// item model 
const Item = mongoose.model('Item', itemSchema);


module.exports={Product,Order,Item}
