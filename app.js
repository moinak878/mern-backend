require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const port = process.env.PORT||8000;

mongoose.connect(process.env.DATABASE,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex:true
    }).then(() => {
        console.log('DB CONNECTED');
    })
app.get('/', function (req, res) {
        res.send('Hello World!'); // This will serve your request to '/'.
      });


app.listen(port, () => {
    console.log(`Server is running at ${port}`)
})