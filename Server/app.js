const express = require("express");
const fileUpload = require('express-fileupload');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const app = express()
app.use(cookieParser());

const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions))
const dotenv = require("dotenv")
const port = process.env.PORT || 5000;
app.use(express.json())
dotenv.config({ path: "./config.env" })

// required connection.js 
require("./db/connection")
require("./models/userSchema")

// Link the router files
app.use(require("./router/auth"))
const postRoute = require("./router/post")

// middlewaire
const middlewaire = (req, res, next) => {
    console.log('HELLO from middleware');
    next()
}

app.listen(port, () => {
    console.log(`server is up in ${port}`)
})