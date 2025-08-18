const mongoose = require('mongoose');
const validator= require('validator');


const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");

const userSchema =new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 4, // Ensures firstName has at least 4 characters
        maxlength: 50, // Ensures firstName does not exceed 50 characters
    },
    lastName: {
        type: String,
        required: true,
    },
    emailId: {
        type: String,
        required: true,
        lowercase: true, // Ensures emailId is stored in lowercase
        unique: true, // Ensures that emailId is unique across users   //also define indexes automatically
        trim: true, // Removes any leading or trailing whitespace
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email Address: "+value);
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Not a Strong Password bruh :"+value);
            }
        }
        
    },
    age: {
        type: Number,
        min: 18, // Ensures age is greater than or equal to 18 
    },
    gender: {
        type: "String",
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("gender data is not valid");
        }
        /**
         * either validate using validate(value) like thing or use  enum which is also validate
         * gender:{
         *      type: String,
         *      enum: {
         *          values: ["male","female","others"],
         *          message: `{VALUE} is not a valid gender type`
         *       }
         * }
         */
        }
    },
    photoUrl:{
        type: String,
        default:"https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid photoUrl "+value);
            }
        }
    },
    about: {
        type: String,
        default:"This is a default about section.",
    },
    skills: {
        type: [String],
    },
},{
    timestamps: true,
})
//Compound index 
//User.find({firstName:"Akshay",lastName:"Saini"});  
userSchema.index({firstName: 1,lastName: 1});
//we can also create index on firstname only gender only like=>
userSchema.index({gender: 1});

userSchema.methods.getJWT= async function(){
    const user = this;

    const token = await jwt.sign({_id:user._id},"DEVTinder@790",{
        expiresIn:"7d",
    })
    return token;
}

userSchema.methods.validatePassword=async function(passwordInputByUser){
    const user =this;
    const passwordhash=user.password;

    const isPasswordValid=await bcrypt.compare(
        passwordInputByUser,
        passwordhash
    );
    return isPasswordValid; 
}

const UserModel =mongoose.model("User",userSchema);
module.exports=UserModel;