const express =require("express");
const {validateSignUpData} = require("../utils/validation");
const bcrypt = require("bcrypt");
const User =require("../models/user");


const authRouter =express.Router();


authRouter.post("/signup", async (req,res)=>{   
 try{   
    //Validation of the data 
    validateSignUpData(req);

    const {firstName, lastName, emailId, password} = req.body;
    //Encrypt the password
    const passwordhash=await bcrypt.hash(password,10); //10 is the saltRound. more rounds=>more secure(more encrypted)
    //console.log(passwordhash);

    //creating a new instance of the User Model
    const user=new User({
        firstName,
        lastName,
        emailId,
        password: passwordhash,
    });

   
    await user.save();
    res.send("User created successfully");
    }catch(err){
        res.status(400).send("ERROR: " + err.message); 
    }
});

authRouter.post("/login", async(req,res)=>{
    try{
        const {emailId, password}=req.body;

        const user=await User.findOne({emailId: emailId});
        if(!user){
            throw new Error("Invalid Credentials");
        }

        const isPasswordValid =await user.validatePassword(password);  

        if(isPasswordValid){

            const token=await user.getJWT();

            res.cookie("token",token,{
                expires: new Date(Date.now()+8*360000),
            });
            res.send("Login Successful");
        } else {
            throw new Error("Invalid Credentials");
        }
    }catch(err){
        res.status(400).send("Error: "+err.message)
    }
})

authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{
        expires: new Date(Date.now()),
    })
    res.send("Logout Successful");
})

module.exports = authRouter;