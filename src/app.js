const express=require("express");
//require("./config/database");
const connectDB =require("./config/database");
const app=express();
const User =require("./models/user");

app.use(express.json()); // Middleware to parse JSON request bodies


app.post("/signup", async (req,res)=>{
  
    const user=new User(req.body);

    try{   
    await user.save();
    res.send("User created successfully");
    }catch(err){
        res.status(400).send("Error creating user: " + err.message); 
    }
});



//thorugh postman we can send data to the server
// app.post("/signup",async (req,res)=>{
//     console.log(req.body)
// })



// app.post("/signup", async (req,res)=>{
//     //Creating a new instance of the User model
//     const user=new User({
//         firstName:"Ajay",
//         lastName:"kumar",
//         emailId:"ajay2@gmail.com",
//         age:"23",
//         gender:"male",
//     });

//     // await user.save();
//     // res.send("User created successfully");
//     try{   
//     await user.save();
//     res.send("User created successfully");
//     }catch(err){
//         res.status(400).send("Error creating user: " + err.message); 
//     }
// });



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