const mongoose = require("mongoose");

const connectionRequestSchema =new mongoose.Schema(
    {
        fromUserId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", //reference to the User Collection
            required: true
        },
        toUserId:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        status:{
            type: String,
            required: true,
            enum: {
                values:["ignored","interested","accepted","rejected"],
                message: `{VALUE} is incorrect status type`,
            },
        },
    },
    {timestamps: true}
);

//compound index => we use this where we have to search in combo like..fromuserUd,toUserId  oR firstName,lastName
        //const existingConnectionRequest = await ConnectionRequest.findOne({
        //     $or:[
        //         {fromUserId, toUserId},
        //         {fromUserId: toUserId, toUserId: fromUserId }
        //     ],
        // })
        //ONE MORE EXAMPLE copied from requests.js folder
        //User.find({firstName:"Akshay",lastName:"Saini"});   this is for user.js
        //userSchema.index({firstName: 1,lastName: 1});

connectionRequestSchema.index({fromUserId: 1,toUserId: 1});
        
connectionRequestSchema.pre("save",function(next){
    const connectionRequest = this;
    // Check if the fromUserId is same as toUserId
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send connection request to yourself!");
    }
    next();
})

const ConnectionRequestModel =new mongoose.model(
    "ConnectionRequest",
    connectionRequestSchema
)

module.exports= ConnectionRequestModel;