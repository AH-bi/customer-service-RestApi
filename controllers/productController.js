
const {Product} = require ("../models/product") 

const postPrdocuts =async(req,res) =>
{
try{

const {name,price,quantity}=req.body
    const product = new Product ({
        name,
        price,
        quantity
    })
    const data = await product.save()
    res.status(201).json(data)
    
}
catch(error)
{
console.log(error.message)
res.status(500).json({message:"internal server error"})
}

}


const getProducts= async(req,res)=> 
{
    try
    {
    const data  = await Product.find()
    res.status(200).json(data)
    
    }
    catch(error)
    {
    res.status(500).json({message:"internal server error"})
    }
    
    }

const deltePorducts = async(req,res)=> 
{
    try
    {
        const productId  = req.params.productid
        await Product.findByIdAndDelete(productId)
        res.status(204).json({message:"deleted successfully"})
    }
    catch(error)
    {
        console.log(error.message)
        res.status(500).json({message:"Internal server error"})
    }
    
    }
    
    



const updateProductsId = async(req,res) =>
{        console.log("test")

    try{
        const product = req.product
        
        const {price , quantity }= req.body

        product.price = price 
        product.quantity = quantity
        await product.save()
        return res.status(200).json({
            message:"Product updated"
        })
    }
    catch (error)
    {
        console.log(error.message)
        res.status(500).json({message: "Internal server error"})
    }
}
module.exports={postPrdocuts,getProducts,deltePorducts,updateProductsId}