const validator =require("validator");

const validateSignUpData =(req)=>{

    const { firstName, lastName, emailId, password} =req.body;
    if(!firstName || !lastName){
        throw new Error("Name not valid");
    }
    else if(firstName.length<4 || firstName.length>50){
        throw new Error("firstName should be 4-50 characters");
    }
    else if(lastName.length<4 || lastName.length>50){
        throw new Error("lastName should be 4-50 characters");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Not a strong password");
    }

}

const validateEditProfile =(req)=>{
    const allowedFields=["firstName","lastName","age","emailId","gender","about","skills"];

    const isEditAllowed=Object.keys(req.body).every((field)=>
        allowedFields.includes(field)
    )

    return isEditAllowed;
}

module.exports={
    validateSignUpData,
    validateEditProfile
}