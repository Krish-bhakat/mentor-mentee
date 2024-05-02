const admin = require('../database/mentee_data');
const users = require("../database/signedusers");
const bcrypt= require("bcrypt");
const token = require("../utilis/jwttoken");

const login = (async(req,res)=>{
    //taking login inputs from the user 
    const Password = req.body.Password
    const Username = req.body.Username
    //checking if user is present or not
    const UserLoggedIn = await users.findOne({Username})
    console.log(UserLoggedIn)
    
        if(UserLoggedIn){
            if(!UserLoggedIn.isVerified){
                console.log("User not Verified");
                return res.status(401).json({ msg: "User is not verified" });
            }
            else{
            //checking if user is admin or not
            if(UserLoggedIn.isAdmin === true){
                //verifying the password
                if(UserLoggedIn.Password === Password){
                    const createtoken = token(UserLoggedIn)
                    res.cookie("token",createtoken,{
                        httpOnly: true,
                        expires: new Date(Date.now() + 86400000),
                        //secure: true,
                    });
                    return res.redirect("/adminlogin/userdata");
                }
                else{res.status(404).json({msg: "Enter Correct Username/Password"});}
            }
            else{
                //checking if user is student or not
                if(UserLoggedIn.Password === Password){
                    const createtoken = token(UserLoggedIn)
                    res.cookie("token",createtoken,{
                        httpOnly: true,
                        expires: new Date(Date.now() + 86400000),
                        //secure: true,
                    });
                    return res.render("homepage");
                }
                else{
                    res.status(404).json({msg: "Enter Correct Username/Password"});
                }
            }
            }
        }
        else{
            res.status(404).json({msg: "User not verified"});
        }
});
module.exports = login;
