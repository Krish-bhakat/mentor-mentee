const jwt = require('jsonwebtoken');

module.exports = function authcontroller(req,res,next){
    const token = req.cookies.token;
    if(token){
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY)
        if(verifyUser){
            req.user = verifyUser;
            next();
        }else{
            res.status(401).send("Unauthorized User");
        }
    }
    else{
        res.status(401).send("Unauthorised User. Access Denied");
    }
}