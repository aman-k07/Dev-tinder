const express=require("express");

const app=express();

//ERROR HANDLING
//using try catch block
app.get("/getUserData",(req,res)=>{
    try{
        //Logic of DB call and get user data

        throw new Error("fdsf"); //this will be caught by the error handler below
        res.send("User Data Sent");
    }catch(err){
        res.status(500).send("Some error contact support team!");
    }
});

// app.get("/getUserData",(req,res)=>{
     //Logic of DB call and get user data

//     throw new Error("jshviujhs"); //this will be caught by the error handler below

//     res.send("User Data Sent");
// });  

//To handle unusual error we use this error handler
//also called wild card error handling
app.use("/",(err,req,res,next)=>{
    // Log your error 
    if(err){
        res.status(500).send("Something went wrong!");
    }
});
//doesnot matter either we put this on top as it doesnot throw any error
//but if we write in both upper and lower then it matters


/** 
//Lets write clean code for the routes
const { adminAuth,userAuth } = require("./middlewares/auth");

// app.use("/admin",adminAuth);
// app.use("/user",userAuth);
//Either this way or
app.use("/admin",adminAuth);

app.post("/user/login",(req,res)=>{    //here auth not reqd. bcz its a login route
    res.send("User Logged In Successfully");
});

app.get("/user",userAuth,(req,res)=>{
    res.send("User Data Sent");
});


app.get("/admin/getAllData",(req,res)=>{
    res.send("All Data Sent");
});

app.get("/admin/deleteUser",(req,res)=>{
    res.send("User Deleted");
});
app.get("/user",(req,res)=>{
    res.send("All Data Sent");
});
*/

/**
// Handle Auth Middleware for all GET POST ,.... requests
app.use("/admin",(req,res,next)=>{
    console.log("Admin auth is getting checked!!");
    // Logic of checking if the request is authorized or not
    const token="xyz";
    const isAdminAuthorized=token==="xyz";
    if(!isAdminAuthorized){
        res.status(401).send("Unauthorized request");
    }else{
        next(); //if the user is authorized then we call next() to go to the next route handler
    }
});

app.get("/admin/getAllData",(req,res)=>{
    res.send("All Data Sent");
});

app.get("/admin/deleteUser",(req,res)=>{
    res.send("User Deleted");
});
 */

/** 
app.get("/admin/getAllData",(req,res)=>{
    // Logic of checking if the request is authorized or not
    const token="xyz";
    const isAdminAuthorized=token==="xyz";
    if(isAdminAuthorized){
        res.send("All Data Sent");
    }else{
        res.status(401).send("Unauthorized request");
    }
});

app.get("/admin/deleteUser",(req,res)=>{
    // Logic of checking if the request is authorized or not
    //so we have to write it once again so that we can check if the user is authorized or not
    //to avoid this we can use middleware
});
*/

/**
// we can also pass in like this
app.get("/user",
    (req,res,next)=>{
       console.log("Handling the route user!!");
       next();
});
app.get("/user",
    (req,res)=>{
        console.log("Handling the route user 2!!");
        res.send("Response 2");
});
 */

/** 
app.use("/user",(req,res,next)=>{
    console.log("Handling the route user!!");
    //res.send("Response 1");
    next(); 
    },
    (req,res,next)=>{
        //console.log("Handling the route user 2!!");
        //res.send("Response 2");
        next();
        console.log("Handling the route user 2!!");
    },(req,res)=>{
        console.log("Handling the route user 3!!");
        res.send("Response 3");
        // if we comment res.send and use next(); then it throws cannot /GET user
        //bcq it expects another route handler to send a response but we are not sending 
}
);
*/

/** 
app.use("/user",(req,res,next)=>{
    console.log("Handling the route user!!");
    res.send("Response 1");
    next(); //after adding next() the next route handler will be called
    //Cannot set headers after they are sent to the client=>THIS error is seen bcz we already sent the response in the first route handler, so we cannot send another response in the next route handlers
    },
    (req,res)=>{
        console.log("Handling the route user 2!!");
        res.send("Response 2");
    },(req,res)=>{
        console.log("Handling the route user 3!!");
        res.send("Response 3");
}
);

2nd case of next() function

app.use("/user",(req,res,next)=>{
    console.log("Handling the route user!!");
    
    next(); //after adding next() the next route handler will be called
    res.send("Response 1");

    //in this Response 2 prnted and then it agains throw error 
    },
    (req,res)=>{
        console.log("Handling the route user 2!!");
        res.send("Response 2");
    },(req,res)=>{
        console.log("Handling the route user 3!!");
        res.send("Response 3");
}
);
*/

/** 
app.use("/user",(req,res,next)=>{
    console.log("Handling the route user!!");
    //res.send("Response 1");
    next(); //after adding next() the next route handler will be called
    },
    (req,res)=>{
        console.log("Handling the route user!!");
        res.send("Response 2");
    },(req,res)=>{
        console.log("Handling the route user!!");
        res.send("Response 3");
}
);
*/


/** 
app.use("/user",(req,res)=>{
    //Route Handler
    //res.send("Route Handler 1");  //postman will sending req continuously but nothing get back as response and it automatically stops 
    console.log("Handling the route user!!");
    res.send("Response from user route");
})
*/


/**
 * One route handler can handle multiple routes
 * app.use("/user",(req,res)=>{
 *     console.log("Handling the route user!!");
 *     res.send("Response1");                 // this will be printed on postman and not the below ones even if we comment this out 2nd route handle or 3rd one not sent ,for that we hae to use next() function
 * },
 * (req,res)=>{
 *     console.log("Handling the route user!!");
 *     res.send("Response2");
 * },
 * (req,res)=>{
 *     console.log("Handling the route user!!");
 *     res.send("Response3");
 * }
 * 
 * );
 */

app.listen(3030,()=>{
    console.log("server started on port 3000");
})