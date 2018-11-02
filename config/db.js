require('dotenv/config');
const db = process.env.MDB_ENV;
module.exports = {
    //database:'mongodb://localhost:27017/students',
    database: db,
    secret: process.env.SECRET_CODE
}