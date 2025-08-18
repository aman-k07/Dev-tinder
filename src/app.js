const express=require("express");
//require("./config/database");
const connectDB =require("./config/database");
const app=express();
const User =require("./models/user");

const {validateSignUpData} = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt =require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");


app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cookieParser()); //Middleware to parse Cookie


const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requests = require("./routes/requests");
const requestRouter = require("./routes/requests");
const userRouter= require(".//routes/user")


app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);



connectDB()  
   .then(()=>{
    console.log("Database connection established...");
    app.listen(7777,()=>{
        console.log("server started on port 7777");
    })
   })
   .catch((err)=>{
    console.error("database cannot be connected");
   })

// app.listen(3030,()=>{
//     console.log("server started on port 3000");
// });
//here is a problem => here first listen happens then listened ,what if a client hit the server but DB not connected , 
// its a bit problem so we need to connect to the database first after that => start the server