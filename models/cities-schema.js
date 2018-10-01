var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cities = mongoose.Schema({
    id: {
        type: String,
      },
    name:{
        type: String,
      },
    state_id:{
        type: String,
    }},
    {collection:"cities"});
    
//create model that uses schema
module.exports =  mongoose.model('Cities',cities,'cities');