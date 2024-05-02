const express = require("express");
const router = express.Router();
const verifyemail = require("../controllers/authVerificationController")

router.route('/verify/:verificationtoken')
        .get(verifyemail)

module.exports = router;
