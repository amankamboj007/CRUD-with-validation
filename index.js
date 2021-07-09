const express = require ('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const route = require('./route/route')
const auth = require('./route/auth')
const mongooese = require('mongoose')
const verify = require('./middleware/verify')
// middleware 
app.use(express.json())
//dotenv PORT 
const port = process.env.port|| 6000

// mongoose connection
mongooese.connect(process.env.mongo_url,{ useNewUrlParser: true,useUnifiedTopology: true  },()=>{
    console.log('DB CONNECTED ')
})
//route middleware
app.use('/api/auth',auth)

app.use('/api',verify,route)

app.listen(port,()=>{
    console.log(`Server is up at ${port}`)
})