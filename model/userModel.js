const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    age:
    {
        type: Number,
        require: true
    },
    email:{
        type: String,
    },
    password:{
        type: String,
        require: true

    },
    isActive:{
        type: Boolean,
        default: true
    }

})
module.exports = mongoose.model('PracticeDB', userSchema,'PracticeDB')
