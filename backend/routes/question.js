var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    option:{
        type: String,
        require: true
    },
    correct_option:{
        type:Number,
        require: true
    },
    quiz:{
        type:Schema.Types.ObjectId,
        require: true
    },
    points:{
        type:Number,
        require:true
    }
});

var Question = module.exports = mongoose.model('Question',questionSchema,"question");
//get quiz
module.exports.getQuestion = function(callback,limit){
    Question.find(callback);
}

module.exports.getQuizQuestion = function(queryObj,callback){
    Question.find(queryObj,callback);
}

//add quiz
module.exports.addQuestion = function(question,callback){
    Question.create(question,callback);
}