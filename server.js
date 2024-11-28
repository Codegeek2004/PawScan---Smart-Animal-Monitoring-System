const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const port=3019

const app=express();
app.use(express.static(__dirname))

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'ht.html'))
})
app.listen(port,()=>{
    console.log("Server started")
})



// ******************************************
const mongoose = require('mongoose');

// Connect to the database
mongoose.connect('mongodb://localhost:27017/pawscan', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log('MongoDB connection error:', err));
