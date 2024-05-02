const express = require("express");
const User = require("../database/signedusers");
const jwttoken = require("../utilis/jwttoken")

const verifyuser = async(req,res)=>{
    const {verificationtoken} = req.params;

    const user = await User.findOne({ verificationtoken});
    if (!user) {
      return res.status(404).send('Invalid verification token');
    }
    
    user.isVerified = true;
    user.verificationtoken = null; // Remove the verification token
    await user.save();

    //creating token and saving it in the cookies
    const createtoken = jwttoken(user);
    res.cookie("token",createtoken,{
        // httpOnly: true,
        expires: new Date(Date.now() + 86400000),
        //secure: true,
    });
    //redirect the user to the page where the form link is present 
    if(user.isAdmin === false){
      res.redirect("/home")
    }
    else{
      res.redirect("/adminlogin/userdata")
    }
        
}

module.exports = verifyuser;
