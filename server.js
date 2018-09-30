var express=require('express');
var bodyParser = require('body-parser');
const path = require('path');
const api = require('./routes/api');
const passport = require('passport');
const session = require('express-session');
var jwt = require('jsonwebtoken');
const port = 4003;


var app=express();
app.use(express.static(path.join(__dirname,'/')));
require('./config/passport')(passport);
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(session({
    secret:'thesecret',
    saveUninitialized:false,
    resave:false
}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(passport.initialize());
app.use(passport.session());

app.use('/api',api);

app.get('*',(req,res)=>{
   res.sendfile(path.join(__dirname,'../src/index.html'))
});

app.listen(port,()=>console.log("server is running"));