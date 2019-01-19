var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const examconfig = mongoose.Schema({
    stateid: {
        type: Number,
        required:true
      },
    cityid:{
        type: Number,
        required:true
      },
    examcode:{
        type: Number,
        unique: true,
        index: { unique: true,dropDups: true },
        required:true
    },
    seatlimit:{
        type: Number,
        required:true
    },
    remaining:{
        type: Number,
        required:true
    }},
    {collection:"examconfig"});
    
//create model that uses schema
module.exports =  mongoose.model('Examconfig',examconfig,'examconfig');