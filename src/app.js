const express=require("express");
//require("./config/database");
const connectDB =require("./config/database");
const app=express();
const User =require("./models/user");

const {validateSignUpData} = require("./utils/validation");
const bcrypt = require("bcrypt");

app.use(express.json()); // Middleware to parse JSON request bodies

app.post("/login", async(req,res)=>{
    try{
        const {emailId, password}=req.body;
        
        const user=await User.findOne({emailId: emailId});
        if(!user){
            //throw new Error("EmailId is not present in DB"); //this is information leaking we dont have to tell what is correct or not so use invalid credential in both emaillId and password
            throw new Error("Invalid Credentials");
        }
        const isPasswordValid= await bcrypt.compare(password, user.password);

        if(isPasswordValid){
            res.send("Login Successful");
        } else {
            //throw new Error("Password is not Correct"); //use invalid credential as msg in both email and pass instead to prevent from data leaking
            throw new Error("Invalid Credentials");
        }


    }catch(err){
        res.status(400).send("Error: "+err.message)
    }
})

app.post("/signup", async (req,res)=>{   
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

//Get user by Email
app.get("/user",async (req,res)=>{
    const userEmail=req.body.emailId;

    try{
        const user=await User.find({emailId: userEmail});
        if(user.length===0){
            res.status(404).send("User not found");
        }else{
            res.send(user);
        }
       
    }catch(err){
        res.status(400).send("Error in getting user via emailId");
    }

    
   //findone - get only one user by email or id  or anything we specify
    // try{
    //     const userss=await User.findOne({emailId: userEmail});
    //     if(!userss){
    //         return res.status(404).send("User not found");
    //     }else{
    //         res.send(userss);
    //     }
        
    // }catch(err){
    //     res.status(400).send("Error in getting user via emailId");
    // }
});

//all users from the DB
app.get("/feed", async (req,res)=>{
    try{
        const users=await User.find({});
        res.send(users);
    }catch(err){
        res.status(400).send("Error in getting all users");
    }
})

//delete user by id
app.delete("/user", async (req,res)=>{
    const userId=req.body.userId;

    try{
        //const user = await User.findByIdAndDelete({ _id: userId});
               //OR
        const user=await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    }catch(err){
        res.status(400).send("Error in deleting user");
    }
});

//update user by id- here userid url se utha rahe bajaye req.body ke
app.patch("/user/:userId",async (req,res)=>{
    const userId=req.params?.userId;
    const data=req.body;
    try{
        const ALLOWED_UPDATES=["photoUrl","about","gender","age","skills"];

        const isUpdateAllowed=Object.keys(data).every((k)=>
            ALLOWED_UPDATES.includes(k)
        )

        if(!isUpdateAllowed){
            throw new Error("Update not alllowed");
        }
       if(data?.skills.length > 10){
            throw new Error("Skills not more than 10");
       }

        const user = await User.findByIdAndUpdate({_id: userId},data,{
            returnDocument: "after",
            runValidators: true, //when we validate the gender ,not working for update so using this runValidator
        });
        res.send("User updated successfully");
    }catch(err){
        res.status(400).send("Update Failed: "+err.message);
    }
});



//update user by id
// app.patch("/user",async (req,res)=>{
//     const userId=req.body.userId;
//     const data=req.body;
//     try{
//         const ALLOWED_UPDATES=["userId","photoUrl","about","gender","age","skills"];

//         const isUpdateAllowed=Object.keys(data).every((k)=>
//             ALLOWED_UPDATES.includes(k)
//         )

//         if(!isUpdateAllowed){
//             throw new Error("Update not alllowed");
//         }
//         //here is a catch ki we dont have to update userId ,so access bhi band krna hoga
//         //uske liye ek kaam kr sakte =>url se hi utha lete hai id ko


//         const user = await User.findByIdAndUpdate({_id: userId},data,{
//             returnDocument: "after",
//             runValidators: true, //when we validate the gender ,not working for update so using this runValidator
//         });
//         res.send("User updated successfully");
//     }catch(err){
//         res.status(400).send("Update Failed: "+err.message);
//     }
// });


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