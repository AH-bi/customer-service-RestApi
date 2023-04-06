
const {Product} = require ("../models/order") 

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
    res.status(200).json(data)
    
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
    const {id}  = req.params.id
    
    await Product.findByIdAndDelte(id)
    res.status(200).json({message:"deleted successfully"})
    }
    catch(error)
    {
    res.status(404).json({message:"Product not found"})
    }
    
    }
    
    



const updateProductsId = async(req,res) =>
{        console.log("test")

    try{
        const productId = req.params.productid 
        const product = await Product.findById(productId)
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