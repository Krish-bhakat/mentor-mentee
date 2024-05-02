const menteedata = require("../database/mentee_data");

const menteereg = async(req,res)=>{
    try {
//taking inputs from user and storing in db
        timestamp = new Date(),
        profile_photo = req.file.filename,
         Sname = req.body.Sname,
         roll_no = req.body.roll_no,
         section = req.body.section,
         branch = req.body.branch,
         batch = req.body.batch,
         email=req.body.email,
         password=req.body.password,
         phone=req.body.phone,
         local_address = req.body.local_address,
         father_name = req.body.father_name,
         father_phone = req.body.father_phone,
         father_email = req.body.father_email,
         father_occupation= req.body.father_occupation,
         mother_name = req.body.mother_name,
         mother_phone = req.body.mother_phone,
         mother_email = req.body.mother_email,
         mother_occupation= req.body.mother_occupation,
         parents_address = req.body.parents_address,
         class_10_percentage = req.body.class_10_percentage,
         class_12_percentage = req.body.class_12_percentage;
        
         const menteesignup = await menteedata.create({
            timestamp,
            profile_photo,
            Sname,
            roll_no,
            section,
            branch,
            batch,
            email,
            password,
            phone,
            local_address,
            father_name,
            father_phone,
            father_email,
            father_occupation,
            mother_name,
            mother_phone,
            mother_email,
            mother_occupation,
            parents_address,
            class_10_percentage,
            class_12_percentage
         })
        res.status(201).send(body = "Thank You, Your Data has been recorded");
    } catch (error) {
        console.log(error);
    }
}
module.exports = menteereg;