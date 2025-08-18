const express = require("express");
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");
const requestRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      //ensure that ki bas do hi status bhj sake kyunki idhr accepted bhi bhj de toh send ho jayega ,which is an error
      //so ,we will have to fix this by only allow to send only those status which is allowed fir that loggedIn user
      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid Status Type: " + status });
      }

      //we also have to check ki wo user hai bhi ya nhi databse me jab userId hm de rhe postman se random bhi toh wo  userId pe request sent kr de rh bina dekhe ki wo exist bhi karta h ya nhi
      //let fix this issue of checkinh either the userId is exists or not whom we sent the  connection request
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({ message: "User not Found!!!" });
      }

      //Now there is a issue ki ,what if we have existing Connection Request?
      //as ,same hi req baar baar save hota jayega .for that we use $or method of mongoDb
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingConnectionRequest) {
        return res
          .status(400)
          .json({ message: "Connection request Already exists!!!" });
      }
      //to OPTIMIZE this search of {fromUserId,toUserId}  use compound index ,which we use in connectionRequest.js file
      //compound index => we use this where we have to search in combo like..fromuserUd,toUserId  oR firstName,lastName
      /**
       * ONE MORE EXAMPLE => if we want to search by firstName and lastname
       * like=>  User.find({firstName:"Akshay", lastName: "Saini"})
       * userSchema.index({firstName: 1,lastName: 1})
       */

      const connectionReq = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      //Now we can check either the fromUserId is same as toUserId or not
      //we can write the logic in DB level => in connectionRequest.js
      //check there

      const data = await connectionReq.save();

      res.json({
        // message: "Connectionn req sent successfully",
        message:
          req.user.firstName + " is " + status + " in " + toUser.firstName, //dynamic msg for ignored/interested
        data,
      });
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }

    //res.send(user.firstName + "send the connection request!!!");
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try{
        //Validate the status
        //Akshay => Elon
        //loggedIn === toUserId
        //status = interested
        //request Id should be valid

        const loggedInUser = req.user;
        const { status,requestId }= req.params;

        const allowedStatus=["accepted","rejected"];
        if(!allowedStatus.includes(status)){
            res.status(400).json({message: "Status not allowwed!"});
        }

        const connectionRequest= await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: "interested",
        });
        if(!connectionRequest){
            return res.status(400).json({message: "Connection request not found!"});
        }

        connectionRequest.status=status;

        const data= await connectionRequest.save();

        res.json({message: "Connection Request "+ status, data});

    }catch(err){
        res.status(400).send("ERROR: "+err.message);
    }
  }
);

module.exports = requestRouter;
