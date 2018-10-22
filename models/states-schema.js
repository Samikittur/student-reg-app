var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const states = mongoose.Schema({
    id: {
        type: Number,
        required:true
      },
    sortname:{
        type: String,
        required:true
      },
    phoneCode:{
        type: Number,
        required:true
    },
    states:{
        type: Object,
    }},
    {collection:"states"});
    
//create model that uses schema
module.exports =  mongoose.model('States',states,'states');