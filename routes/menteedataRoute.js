const express = require('express');
const router = express.Router();
const user = require('../database/mentee_data');

router.get("/userdata", async(req,res)=>{
    const users = await user.find();
    res.render("userdata",{users});
})
module.exports = router;