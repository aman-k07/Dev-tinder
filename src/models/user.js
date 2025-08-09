const mongoose = require('mongoose');
const validator= require('validator')

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
        unique: true, // Ensures that emailId is unique across users
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

const UserModel =mongoose.model("User",userSchema);
module.exports=UserModel;