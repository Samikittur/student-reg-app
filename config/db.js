require('dotenv/config');
module.exports = {
    //database:'mongodb://localhost:27017/students',
    database: process.env.MDB_ENV,
    secret: process.env.SECRET_CODE
}