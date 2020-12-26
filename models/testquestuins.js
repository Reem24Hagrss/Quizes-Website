const mongoose = require('mongoose');
const validator = require('validator')

const TestQuestions = mongoose.model('TestQuestions',{
    testID:{
        type: Object,
        required: true,
    },
    questionId:{
        type: Object,
        required: true
    }
})

module.exports = TestQuestions
console.log("TestQuestions is created");