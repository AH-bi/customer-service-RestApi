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
const productRouter = require( './routers/router_product')
const companyRouter = require ('./routers/router_companies')
const personRouter = require ('./routers/router_person')
const customerRouter = require ('./routers/router_customer')
const orderRouter = require ('./routers/router-order');
const itemRouter = require ('./routers/router_item')

// parse application/json request bodies
app.use(bodyParser.json());








// routers
//app.use('',)
app.use('/products',productRouter)
app.use('/companies',companyRouter)
app.use('/persons',personRouter)
app.use('/customers',customerRouter)
app.use('/customers',itemRouter)
app.use('/customers',orderRouter)








app.listen(port,()=>
    {
        console.log(`server is running on port ${port}`)
    }
)

