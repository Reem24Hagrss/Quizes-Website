require('./db/mongoose')
const User = require('./models/user')
const Test = require('./models/test')
const Question = require('./models/question')
const UserTest = require('./models/usertests')
const TestQuestion = require('./models/testquestuins')
const nodemailer = require('nodemailer');
const path = require('paht')

const express = require('express')

const app = express()
const port = process.env.PORT || 5000

// Serve static assets if in production 
if(process.env.NODE_ENV === 'production'){
  // set static folder
  app.use(express.static('client/build'))

  app.get('*', (req,res)=>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.use(express.json())

app.get('/', (req, res) => {
  res.send('<h1>Hello in backend server!</h1>')
})

// sending mail notification
app.get('/finishtest/:userid/:testid/:grade',async(req,res)=>{
  console.log(req.params.userid, req.params.testid);
  let user = ''
  let test = ''
  User.findOne({_id:req.params.userid}).then(item=>{
    user = item
    console.log(item);
  })
  Test.findOne({_id:req.params.testid}).then(item=>{
    console.log(item);
    test = item
  })
  setTimeout(()=>{
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'quizewebsite2020@gmail.com',
        pass: 'quize26122020'
      }
    });
    var mailOptions = {
      from: 'quizewebsite2020@gmail.com',
      to: 'reem24hagrss@gmail.com',
      subject: 'Quizes Website',
      text: `${user.name} has finished ${test.name} test with grade ${req.params.grade}`
    };
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(200).send('Email sent: ' + info.response);
      }
    });
  },200)
})

// admin login 
app.post('/adminlogin',(req,res)=>{
  const password = req.body.password
  console.log(password);
  if(password != '1234'){
    res.status(404).send(false)
  }
  res.status(200).send(true)
})

// user login 
app.post('/userlogin',(req,res)=>{
  const userdata = req.body
  console.log(userdata);
  User.findOne({email:userdata.email},{password:userdata.password}).then((user)=>{
    if(!user){
      return res.status(404).send()
    }
    console.log(user);
    res.status(200).send(user)
  }).catch((e)=>{
    res.status(500).send(e)
  })
})

// show all students
app.get('/getusers',(req,res)=>{
  User.find({}).then((users)=>{
    if(!users){
      return res.status(404).send()
    }
    res.status(200).send(users)
  }).catch((e)=>{
    res.status(500).send(e)
  })
})

// show all tests
app.get('/gettestsusers',(req,res)=>{
  Test.find({}).then( async (tests)=>{
    if(!tests){
      return res.status(404).send()
    }
    let data = []
    tests.forEach(item => {
      UserTest.find({testID:String(item._id)}).then(users =>{
        if(!users){
          return res.status(404).send()
        }
        data.push({
          id: item._id,
          name: item.name,
          students: users.length
        })
      })
    })
    setTimeout(()=>{
      console.log(data);
      res.status(200).send(data)
    },100)
  }).catch((e)=>{
    res.status(500).send(e)
  })
})

app.get('/gettests',(req,res)=>{
  Test.find({}).then((tests)=>{
    if(!tests){
      return res.status(404).send()
    }
    res.status(200).send(tests)
  }).catch((e)=>{
    res.status(500).send(e)
  })
})

// show all questions
app.get('/getquestions',(req,res)=>{
  Question.find({}).then((questions)=>{
    if(!questions){
      return res.status(404).send()
    }
    res.status(200).send(questions)
  }).catch((e)=>{
    res.status(500).send(e)
  })
})

// show all questions
app.get('/getquestion/:id',(req,res)=>{
  const _id = req.params.id
  Question.findById(_id).then((question)=>{
    if(!question){
      return res.status(404).send()
    }
    res.status(200).send(question)
  }).catch((e)=>{
    res.status(500).send(e)
  })
})

// show the full quize
app.get('/gettestquestion/:testid',(req,res)=>{
  const testId = req.params.testid
  TestQuestion.find({testID:testId}).then( async (questions)=>{
    if(!questions){
      return res.status(404).send()
    }
    let data = []
    questions.forEach(item =>{
      Question.findById(item.questionId).then(result =>{
        if(!result){
          return res.status(404).send()
        }
        data.push({
          id : item._id,
          question: result.question,
          choise1: result.choise1,
          choise2: result.choise2,
          choise3: result.choise3,
          choise4: result.choise4,
          answer: result.answer
        })
      })
    })
    setTimeout(()=>{
      console.log(data);
      res.status(200).send(data)
    },200)
  }).catch((e)=>{
    res.status(500).send(e)
  })
})

// show a single question
app.get('/getquestion/:id',(req,res)=>{
  const _id = req.params.id
  Question.findById({_id}).then((question)=>{
    if(!question){
      return res.status(404).send()
    }
    res.status(200).send(question)
  }).catch((e)=>{
    res.status(500).send(e)
  })
})

// show tests for the student
app.get('/getuserTests/:userid',(req,res)=>{
  const userId = req.params.userid
  UserTest.find({userID:userId}).then( async result =>{
    if(!result){
      return res.status(404).send()
    }
    let data = []
    result.forEach(item =>{
      Test.findById(item.testID).then(test =>{
        if(!test){
          return res.status(404).send()
        }
        data.push({
          key: test._id,
          test: test.name,
          grade: item.grade
        })
      })
    })
    setTimeout(()=>{
      console.log(data);
      res.status(200).send(data)
    },200)
   
  }).catch((e)=>{
    res.status(500).send(e)
  })
})

// add new user
app.post('/adduser',(req, res)=>{
  const user = new User(req.body)
  user.save().then(()=>{
      res.status(201).send(user)
  }).catch((e)=>{
      res.status(400).send(e)
  })
})

// add new test
app.post('/addtest',(req, res)=>{
  const test = new Test(req.body)
  test.save().then(()=>{
      res.status(201).send(test)
  }).catch((e)=>{
      res.status(400).send(e)
  })
})

// add new question
app.post('/addquestion',(req, res)=>{
  const question = new Question(req.body)
  question.save().then(()=>{
      res.status(201).send(question)
  }).catch((e)=>{
      res.status(400).send(e)
  })
})

// add question to the test
app.post('/addtestquestion',(req, res)=>{
  const question = new TestQuestion(req.body)
  question.save().then(()=>{
      res.status(201).send(question)
  }).catch((e)=>{
      res.status(400).send(e)
  })
})

// add new test for user
app.post('/addusertest',(req, res)=>{
  const test = new UserTest(req.body)
  test.save().then(()=>{
      res.status(201).send(test)
  }).catch((e)=>{
      res.status(400).send(e)
  })
})

// delete user
app.delete('/deleteuser/:id',(req,res)=>{
  const id = req.params.id
  User.deleteOne({_id:id}).then(()=>{
    res.send('user deleted succesfully')
  }).catch((error)=>{
    console.log(error);
  })
  UserTest.deleteMany({userID: id}).then(()=>{
    // res.send('user deleted succesfully')
  }).catch((error)=>{
    console.log(error);
  })
})

// delete test
app.delete('/deletetest/:id',(req,res)=>{
  const id = req.params.id
  Test.deleteOne({_id:id}).then(()=>{
    res.send('Test deleted succesfully')
  }).catch((error)=>{
    console.log(error);
  })

  TestQuestion.deleteMany({testID:id}).then(()=>{
    // res.send('Test deleted succesfully')
  }).catch((error)=>{
    console.log(error);
  })

  UserTest.deleteMany({testID:id}).then(()=>{
    res.send('Test deleted succesfully')
  }).catch((error)=>{
    console.log(error);
  })
})

// // delete question
app.delete('/deletequestion/:id',(req,res)=>{
  const id = req.params.id
  Question.deleteOne({_id:id}).then(()=>{
    res.send('Question deleted succesfully')
  }).catch((error)=>{
    console.log(error);
  })
  TestQuestion.deleteMany({questionId:id}).then(()=>{
    // res.send('Test deleted succesfully')
  }).catch((error)=>{
    console.log(error);
  })
})

// delete question from test
app.delete('/deletetestquestion/:id',(req,res)=>{
  const _id = req.params.id
  TestQuestion.deleteOne({_id}).then(()=>{
    res.send('Question deleted succesfully')
  }).catch((error)=>{
    console.log(error);
  })
})

app.listen(port, () => {
  console.log(`Backend server up on port ${port}`)
})