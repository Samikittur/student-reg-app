var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exam = mongoose.Schema({
    id: {
        type: String,
      },
    type:{
        type: String,
      }},
    {collection:"exam"});
    
//create model that uses schema
module.exports =  mongoose.model('Exam',exam,'exam');