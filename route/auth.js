const user = require('../model/userModel')
const router = require('express').Router()
const { registerValidation, loginvalidation} = require('../validation-Schema')
const bcrypt = require('bcryptjs')   
const jwt = require('jsonwebtoken')


router.get('/',(req,res)=>{
 res.send('Hit from the auth user ')
})

/

router.post('/register',async(req,res)=>{  
// validation of the body 
const { error } = registerValidation(req.body)
if(error) return res.status(400).send(error.details[0].message)
// checking user already exists or not 
const emailExists = await user.findOne({email: req.body.email})
if(emailExists) return res.status(400).send('User already exists')

//hashing the password 

const sizeofhash = await bcrypt.genSalt(10)     // hash size to make password 
const hashedpassword = await bcrypt.hash(req.body.password, sizeofhash)

// adding the admin
   const newUser = new user({
        name:req.body.name,
        age:req.body.age,
        email:req.body.email,
        password: hashedpassword
    })
    try{
    const saveUser = await newUser.save()
    res.send('user added: ' + saveUser.name )
    }
    catch(err){
        res.status(400).send(err)
    }
})
 // login for token 

 router.post('/login',async(req,res)=>{
     //login schema validation 
     const { error } = loginvalidation(req.body)
     if(error) return res.status(400).send(error.details[0].message)
     // Emailexists or not
     const userExists = await user.findOne({email: req.body.email})
     if(!userExists) res.status(400).send('Email invalid')
     const validpass = await bcrypt.compare(req.body.password, userExists.password)
     if(!validpass) return res.status(400).send('Password invalid')
    //  res.send('logged IN')
    // creating token for the logged in user 
    const token = jwt.sign({ _id:userExists._id },process.env.SecretKey)
    res.header('auth-token',token).send(token);
 })


module.exports = router;
