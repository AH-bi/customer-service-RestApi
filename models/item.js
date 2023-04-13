const mongoose =require("mongoose")
const Schema = mongoose.Schema

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

// item model 
const Item = mongoose.model('Item', itemSchema);

module.exports={Item}
