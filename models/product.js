const mongoose = require("mongoose")
const Schema = mongoose.Schema


// product shema 
const productSchema = new Schema ({

    name: 
    {
        type: String,
        required: [true,"Product name is missing"]

    }
    
    ,price :
    {
            type: Number ,
            min:0,
            required: true,
    }
    
    ,quantity:
    {
    
            type: Number,
            min:0,
            required: true,	
    },
    descrption:String 	 	
})


// product model
const Product = mongoose.model('Product',productSchema)


module.exports={Product}