const jwt = require('jsonwebtoken');

module.exports = function createtoken(users){
    return token = jwt.sign({
        userid: users._id.toString(),
        username: users.Username,
        status: users.isAdmin,
        verification: users.isVerified
        },
         process.env.SECRET_KEY,
        {
        expiresIn: "1d"
        });
};
