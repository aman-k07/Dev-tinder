const adminAuth=(req,res,next)=>{
    console.log("Admin auth is getting checked!!");
    // Logic of checking if the request is authorized or not
    const token="xyz";
    const isAdminAuthorized=token==="xyz";
    if(!isAdminAuthorized){
        res.status(401).send("Unauthorized request");
    }else{
        next(); //if the user is authorized then we call next() to go to the next route handler
    }
};

const userAuth=(req,res,next)=>{
    console.log("User auth is getting checked!!");
    // Logic of checking if the request is authorized or not
    const token="xyz";
    const isAdminAuthorized=token==="xyz";
    if(!isAdminAuthorized){
        res.status(401).send("Unauthorized request");
    }else{
        next(); //if the user is authorized then we call next() to go to the next route handler
    }
};


module.exports={
    adminAuth,
    userAuth
};
