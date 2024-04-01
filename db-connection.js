const mongoose= require('mongoose');
require('dotenv').config();
const url = process.env.DB;
const db = mongoose.connect(url).then(()=>{
    console.log('mongodb connected');
})
module.exports = db