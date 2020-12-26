const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/quizesdb',{
    useNewUrlParser:true ,
    useCreateIndex:true,
    useUnifiedTopology: true
},(error)=>{
    if(!error){
        console.log("Success Connectd");
    }else{
        console.log("Error databse connection");
    }
})
