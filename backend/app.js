var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var Quiz = require('./routes/quiz');
var Question = require('./routes/question');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use((req,res,next)=>{
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Header","*");
  res.header("'Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  next();
})
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost/quiz',{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log("database connected"));

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.get('/',function(req,res){
  res.send('hellow')
});



//get quiz method
app.get('/api/quiz',function(req,res){
  //console.log("requested")
  Quiz.getQuiz(function(err,quiz){
    if(err){
      throw err;
    }
    console.log(quiz)
    res.json(quiz);
  });

});

//post quiz method
app.post('/api/quiz',function(req,res){
  console.log("requested")
  //console.log(req);
  var quiz =req.body;
  Quiz.addQuiz(quiz,function(err,quiz){
    if(err){
      throw err;
    }
    res.json(quiz);
  });
 

});

//get question method
app.get('/api/question',function(req,res){
  //console.log("requested")
  Question.getQuestion(function(err,question){
    if(err){
      throw err;
    }
    console.log(question)
    res.json(question);
  });

});

app.get('/api/quiz_question',function(req,res){
  var quiz_id = req.query.qid;
  var queryObj = {
    Quiz:quiz_id
  }
  Question.getQuizQuestion(queryObj,function(err,questions){
    if(err)
      throw err;
    console.log(questions)
    res.json(questions);
  })
})


//post question method
app.post('/api/question',function(req,res){
  console.log('requested');
  var q = req.body;
  console.log("received body",q);
  Question.addQuestion(q,function(err,question){
    if(err){
      throw err;
    }
    console.log(question);
    res.json(question);
  });
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
app.listen(8081);
console.log('Running on port 8081...');