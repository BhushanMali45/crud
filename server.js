const express = require('express');
const morgan=require('morgan');
const dotenv=require("dotenv");
const bodyparser=require("body-parser");
const path=require("path");

const connectDB=require('./server/database/connection');

// const db=require('./server/database/connection');
const app = express();
app.use(morgan('tiny'));



app.use(bodyparser.urlencoded({extended:true}))


//engine
app.set("view engine","ejs")
// app.set("views",path.resolve(__dirname."views/ejs"))
// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

dotenv.config({path :'config.env'})
const PORT =process.env.PORT || 8070;

//mongo 
connectDB();

//load router
app.use("/",require('./server/routes/router'))

app.get('/', (req, res) => {
    res.status(200).send('Hello, World!');
  });

app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`)

})
