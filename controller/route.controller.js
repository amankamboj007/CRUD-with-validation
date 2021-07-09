const user = require('../model/userModel')


const adduser =  async(req,res)=>{
    const adduser = new user({
        name:req.body.name,
        age:req.body.age,
        email:req.body.email
    })
    const addeduser = await adduser.save()
    res.send(`user ${addeduser.name} is added`)
}
const getuser = async(req,res)=>{
    const alluser = await user.find()
    res.send(alluser)
}
const userbyID = async(req,res)=>{
    // user.findOneAndUpdate({_id:id},{name:req.body.name, age: req.body.age})
    const id = req.params.id
    const userDetail = await user.findById({_id:id})
    res.send(userDetail)
}
const updateuser = async(req,res)=>{
    const id = req.params.id
   await user.findOneAndUpdate({_id:id},{name:req.body.name, age: req.body.age})
    // const userDetail = await user.findById({_id:id})
    res.send('user updated')
}
module.exports = {
    adduser,
    getuser,
    userbyID,
    updateuser
}