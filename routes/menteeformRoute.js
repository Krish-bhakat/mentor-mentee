const express = require("express");
const router = express.Router()
const menteeregistration = require("../controllers/authMenteeformController")

router.route('/menteeform')
    .get((req,res)=>{
    res.render('menteeform2')
})
    .post(menteeregistration);
module.exports = router