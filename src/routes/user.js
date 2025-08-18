const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user")

const USER_SAFE_DATA="firstName lastName photoUrl age";

//Get all pending connection request for the loggedIn User
userRouter.get("/user/requests/received", userAuth, async(req,res)=>{
    try{

       // WE  want pending request but this code give all the status either rejected or pending or accepted which is wrong 
        // const loggedInUser= req.user;
        // const connectionRequest = await ConnectionRequest.find({
        //     toUserId: loggedInUser,
        // });
        // res.json({message: "Data fetched Successfully",data: connectionRequest})

        const loggedInUser= req.user;
        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser,
            status: "interested", // only change from prev code and we ge only interested /pending requests
        }).populate("fromUserId","firstName lastName"); 
        //populate("fromUserId",["firstName","lastName"]); two ways of writing either in this array way OR String way

        res.json({message: "Data fetched Successfully",data: connectionRequest})




    }catch(err){
        res.status(400).send("ERRPR: "+err.message);
    }
});

userRouter.get("/user/connections", userAuth, async(req,res)=>{
    try{
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            $or: [
                {toUserId: loggedInUser._id, status: "accepted"},
                {fromUserId: loggedInUser._id,status: "accepted"}
            ]
        }).populate("fromUserId",USER_SAFE_DATA)
          .populate("toUserId", USER_SAFE_DATA);//added later after issue of last 15 min testing

        //const data =connectionRequest.map((row)=>row.fromUserId); // only need that much info nothing else
            //editing this after issue of last 15 min testing

        const data = connectionRequest.map((row)=>{
            // if(row.fromUserId._id === loggedInUser._id){    //id comparision is not correct
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){    
                return row.toUserId;
            } 
            return row.fromUserId;
        })
        //res.json({data: connectionRequest});
        res.json(data);

    }catch(err){
        res.status(400).send({message: err.message});
    }
})

userRouter.get("/feed", userAuth, async(req, res)=>{
    try{

        //User should see all the user except
        //0. his own card
        //1. his connections
        //2. ignored people
        //3. already sent the connection request

        const loggedInUser=  req.user;

        //PAGINATION CONCEPT
                //const page = parseInt(req.params.page) || 1;   this is wrong req.params used where path is like /feed/:page
                //const limit = parseInt(req.params.limit) ||10;
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) ||10;   
        // SANITIZE LIMIT  first make const to let in const limit = ... => let limit = ...
        limit = limit > 50 ? 50 : limit;
        const skip = (page-1)*limit;

        //Find all the connection request (sent + received)
        const connectionRequest= await ConnectionRequest.find({
            $or:[
                {fromUserId: loggedInUser._id},
                {toUserId: loggedInUser._id}
            ]
        }).select("fromUserId toUserId")
          //.populate("fromUserId","firstName")
          //.populate("toUserId","firstName")
            //now we had to hide these which is either in interested,accepted,rejected status ,,only want new user which is new to feed
        
        const hideUserFromFeed = new Set();
        connectionRequest.forEach((req) => {
            // hideUserFromFeed.add(req.fromUserId);   these were give objects, so add .toString() to get string
            // hideUserFromFeed.add(req.toUserId);
            hideUserFromFeed.add(req.fromUserId.toString());
            hideUserFromFeed.add(req.toUserId.toString());
        });  
        console.log(hideUserFromFeed); 

        //NOW I GOT ALL THE PEOPLE WHOSE PROFILE WE DONT HAVE TO SEND
        const users = await User.find({
            $and: [
                { _id: { $nin: Array.from(hideUserFromFeed)} },
                { _id: { $ne: loggedInUser._id } }
            ]
        })
          .select(USER_SAFE_DATA)
          .skip(skip)
          .limit(limit);
        //res.send(users);
        res.json({data: users});

        //res.send(connectionRequest);

    }catch(err){
        res.status(400).json({message: err.message});
    }
})


module.exports = userRouter;