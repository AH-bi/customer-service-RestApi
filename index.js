const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


// create app express
const app = express()

// port number
const port = 3000

// connect to mongodb
mongoose.connect('mongodb://localhost:27000/customers2ss' ,{ useNewUrlParser: true })

mongoose.connection.on('error',(error)=>{
    console.log(error.message)
})

mongoose.connection.on('connected',()=>{
    console.log("connection established")
})

// import routers 
//const router = require('./routers/router')
const productsRouter = require( './routers/router_product')
const companyRouter = require ('./routers/router_companies')
const personRouter = require ('./routers/router_person')
const customerRouter = require ('./routers/router_customer')


// parse application/json request bodies
app.use(bodyParser.json());








// routers
//app.use('',)
app.use('/products',productsRouter)
app.use('/companies',companyRouter)
app.use('/persons',personRouter)
app.use('/customers',customerRouter)








app.listen(port,()=>
    {
        console.log(`server is running on port ${port}`)
    }
)

