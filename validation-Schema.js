// /validatin of schema we are sending

const Joi = require('@hapi/joi')


const registerValidation = (data) =>{
const schema = Joi.object({
    name: Joi.string().min(6).required(),
    age: Joi.number().max(99).required(),
    email: Joi.string().min(6).email(),
    password: Joi.string().min(4).required()
} )
return schema.validate(data)
}

const loginvalidation = (data) =>{
    const schema = Joi.object({
        email: Joi.string().min(6).email(),
        password: Joi.string().min(4).required()
    } )
    return schema.validate(data)
    }
module.exports = {
    registerValidation,
    loginvalidation
}
