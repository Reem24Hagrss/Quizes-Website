const mongoose = require('mongoose');
const validator = require('validator')

const Test = mongoose.model('Test',{
    name:{
        type: String,
        required: true,
    },
})

module.exports = Test
console.log("Test is created");