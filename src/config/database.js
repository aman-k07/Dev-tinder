const mongoose = require('mongoose');

const connectDB=async()=>{
    await mongoose.connect(
        "mongodb+srv://aman2436411:WPQdLyQvEjWKp3st@namastenode.6lxws2a.mongodb.net/devTinder"
    );
};

module.exports = connectDB;

// connectDB()  
//    .then(()=>{
//     console.log("Database connection established...");
//    })
//    .catch((err)=>{
//     console.error("database cannot be connected");
//    })