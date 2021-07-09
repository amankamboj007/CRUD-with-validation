const router = require('express').Router()

const user = require('../model/userModel')

const { adduser, getuser, userbyID,updateuser } = require('../controller/route.controller')
router.get('/',(req,res)=>{
    res.send('Hit from router module ')
})

router.post('/user',adduser)
router.get('/user',getuser)
router.get('/user/:id',userbyID) 
router.put('/user/:id',updateuser) 
module.exports = router