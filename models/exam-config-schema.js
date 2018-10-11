var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const examconfig = mongoose.Schema({
    stateid: {
        type: Number,
      },
    cityid:{
        type: Number,
      },
    examcode:{
        type: Number,
        unique: true,
        index: { unique: true,dropDups: true },
        required:true
    },
    seatlimit:{
        type: Number,
    },
    remaining:{
        type: Number,
    }},
    {collection:"examconfig"});
    
//create model that uses schema
module.exports =  mongoose.model('Examconfig',examconfig,'examconfig');