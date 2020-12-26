const mongoose = require('mongoose');
const validator = require('validator')

const User = mongoose.model('User',{
    name : {
        type: String,
        required: true,
    },
    email : {
        type:String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password : {
        type: String,
        required: true,
        trim: true,
        minlength:7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error("assword shouldn't contain 'password'");
            }
        }
    }
})

module.exports = User
console.log("User is created");