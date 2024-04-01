const mongoose= require('mongoose');
const url = process.env.DB;
const db = mongoose.connect(url).then(()=>{
    console.log('mongodb connected');
})
module.exports = db