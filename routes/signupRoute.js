const express = require('express');
const signup_controller = require('../controllers/authSignupController')
const router = express.Router();
const validatinguser = require("../utilis/zodvalidation");


router.route('/signup')
      .get(function (req,res){
            res.render("signupform")
      })
      .post(validatinguser,signup_controller)
module.exports = router;