const express=require("express");

const app=express();

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