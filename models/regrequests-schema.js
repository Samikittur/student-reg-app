var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const regrequests = mongoose.Schema({
    userid: {
        type: String,
        required:true
    },
    stateid: {
        type: Number,
        required:true
      },
    cityid:{
        type: Number,
        required:true
      },
    exam_code:{
        type: Number,
        required:true
    },
    father_name:{
        type: String,
        required:true
    },
    last_name:{
        type: String,
        required:true
    },
    mobileno:{
        type: String,
        required:true
    },
    city:{
        type: String,
        required:true
    },
    street:{
        type: String,
        required:true
    },
    address:{
        type: String,
        required:true
    },
    zipcode:{
        type: Number,
        required:true
    }},
    {collection:"regrequests"});
    
//create model that uses schema
module.exports =  mongoose.model('Regrequests',regrequests,'regrequests');