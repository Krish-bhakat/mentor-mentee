const bcrypt = require("bcrypt");
const user = require('../database/signedusers');
const token = require("../utilis/jwttoken");
const nodemailer = require("nodemailer");

const signup = (async(req, res) => {
//taking inputs from the user
   const Username = req.body.Username;
   const Student_Emailid = req.body.Student_Emailid;
   const Password = req.body.Password;

   console.log(req.body);
    //searching if user is already present or not
    const userpresent = await user.findOne({Student_Emailid})
    if(!userpresent){

        const verificationtoken = Math.random().toString(34).substring(10);

        const usersignup = await user.create({
            Username,
            Student_Emailid,
            Password,
            verificationtoken
        });
        console.log(usersignup);

        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'douglas.ferry7@ethereal.email',
                pass: 'gFSCQ9cK8FgpdRzwSQ'
            }
        });

        await transporter.sendMail({
            from: 'willard.dickinson81@ethereal.email',
            to : Student_Emailid,
            subject: "Email Verification",
            html: `
            <h3>Click on the link below to verify your email</h3>
            <a href="http://localhost:3000/signup/verify/${verificationtoken}">Verify your email</a>`
        })

        res.status(201).json({ message: 'Please check your email to verify your account' });
    }
    else{
        res.send("User already exists")
    }
});
module.exports = signup