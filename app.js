require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const port = process.env.PORT || 8000;
const cookieParser = require('cookie-parser')
const cors = require('cors')

//My routes
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const categoryRoutes = require("./routes/category")
const productRoutes = require("./routes/product")
const orderRoutes = require("./routes/order")

//DB Connection
mongoose.connect(process.env.DATABASE,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex:true
    }).then(() => {
        console.log('DB CONNECTED');
    }).catch( (e)=>(
        console.log(`DB CONNECTION FAILED : ${e}`)
    ));

//Middlewares
app.use(express.json()) //body parser is built into express now 
app.use(cookieParser())
app.use(cors())

//Routes 
app.use("/api", authRoutes)
app.use("/api",userRoutes)
app.use("/api",categoryRoutes)
app.use("/api",productRoutes)
app.use("/api",orderRoutes)
//app.get('/', function (req, res) {res.send('Hello World!')}); // This will serve your request to '/'.


//Starting a server 
app.listen(port, () => {
    console.log(`Server is running at ${port}`)
})