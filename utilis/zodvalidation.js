const uservalidation = require("./zodschema");

const validatinguser = (req,res,next)=>{
    try {
        const validuser = uservalidation.safeParse(req.body)
        if(validuser.success){
            console.log("qwerty")
            next();
        }
        else{
            res.status(400).json({msg: "invalid inputs"})
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({msg: "error"})
    }
}
module.exports = validatinguser;