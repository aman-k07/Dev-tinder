const express =require("express");
const { userAuth } = require("../middlewares/auth");
const profileRouter =express.Router();
const { validateEditProfile } = require("../utils/validation");


profileRouter.get("/profile/view",userAuth, async(req,res)=>{
  try{
    const user=req.user;
    
    res.send(user); 
  }catch(err){
    res.status(400).send("Error: "+err.message);
    } 

})

profileRouter.patch("/profile/edit" ,userAuth ,async(req, res)=>{
    try{
        if(!validateEditProfile(req)){
            throw new Error("Invalid Edit Requests!!!");
        }

        const loggedInUser=req.user;

        console.log(loggedInUser);
        //loggedInUser.firstName=req.body.firstName; just like this repeat for whole fields but this is repeating task so use js function for that
        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
        
        await loggedInUser.save();

        console.log(loggedInUser);
        // res.send(`${loggedInUser.firstName},Your   Profile updated successfully`);
                           //OR
        res.json({
            message: `${loggedInUser.firstName},Your   Profile updated successfully`,
            data: loggedInUser
        })                   

    }catch(err){
        res.status(400).send("ERROR: "+err.message);
    }
    
})




module.exports = profileRouter;