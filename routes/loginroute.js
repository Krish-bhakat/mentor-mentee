const express = require('express');
const login_controller = require('../controllers/authLoginController')
const router = express.Router()

router.route('/login')
    .get(function(req,res){
        res.render("admin_login")
})
    .post(login_controller)
module.exports = router;
