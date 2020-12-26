const mongoose = require('mongoose');
const validator = require('validator')

const UserTests = mongoose.model('UserTests',{
    userID:{
        type: Object,
        required: true,
    },
    testID:{
        type: Object,
        required: true,
    },
    grade:{
        type: String,
        default: 0,
        required: true
    }
})

module.exports = UserTests
console.log("UserTests is created");