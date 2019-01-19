var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cities = mongoose.Schema({
    id: {
        type: String,
        required:true
      },
    name:{
        type: String,
        required:true
      },
    state_id:{
        type: String,
        required:true
    }},
    {collection:"cities"});
    
//create model that uses schema
module.exports =  mongoose.model('Cities',cities,'cities');