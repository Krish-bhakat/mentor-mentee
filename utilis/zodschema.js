const z = require("zod");
    const userSchema = z.object({
        Username: z
        .string({required_error: "Username is Mandatory"})
        .min(3, {message: "Username must be atleast 3 letters"}),
        Student_Emailid: z
        .string({required_error: "Email is Mandatory"})
        .email({message: "Email is not valid"}),
        Password: z
        .string({required_error: "Password is Mandatory"})
        .min(5, {message: "Password must be atleast 5 letters"})
        .regex(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/,"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.")
         
    });
module.exports = userSchema;