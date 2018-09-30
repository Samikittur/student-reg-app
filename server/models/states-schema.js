var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const states = mongoose.Schema({
    id: {
        type: Number,
      },
    sortname:{
        type: String,
      },
    phoneCode:{
        type: Number,
    },
    states:{
        type: Object,
    }},
    {collection:"states"});
    
//create model that uses schema
module.exports =  mongoose.model('States',states,'states');