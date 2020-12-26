const mongoose = require('mongoose');
const validator = require('validator')

const Question = mongoose.model('Question',{
    question : {
        type: String,
        required: true,
    },
    choise1 : {
        type: String,
        required: true,
    },
    choise2 : {
        type: String,
        required: true,
    },
    choise3 : {
        type: String,
        required: true,
    },
    choise4 : {
        type: String,
        required: true,
    },
    answer : {
        type: String,
        required: true,
    }
})

module.exports = Question
console.log("Question is created");