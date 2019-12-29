var mongoose = require('mongoose');

var quizSchema = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    }
});

var Quiz = module.exports = mongoose.model('Quiz',quizSchema,"quizs");
//get quiz
module.exports.getQuiz = function(callback,limit){
    Quiz.find(callback);
}

//add quiz
module.exports.addQuiz = function(quiz,callback){
    Quiz.create(quiz,callback);
}