//requiring modules

const express = require('express');
require('dotenv').config();
const app = express();
const path = require('path');
const hbs = require('hbs');
const connectdb = require('./utilis/db');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const multer = require("multer")
const {engine} = require('express-handlebars');
const users = require('./database/mentee_data');
const nodemailer = require('nodemailer');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = 3000;

//routes
const loginroute = require('./routes/loginRoute');
const signuproute = require('./routes/signupRoute');
const userdata = require('./routes/menteedataRoute');
const menteeform = require('./routes/menteeformRoute');
const authmiddleware = require('./utilis/authmiddleware');
const verifyuser = require('./routes/verificationRoute');

//multer configuration
let storage = multer.diskStorage({
    destination: "./public/images/",
    filename:(req,file,cb)=>{
        return cb(null,file.originalname);
    }
});
let upload = multer({
    storage: storage,
})

//dynamic and static files directory setup
app.engine('.hbs', engine({
    extname: '.hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
    defaultLayout: false,
    layoutsDir: 'views'
}))
app.set('view engine', 'hbs');
app.set("views", path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname, 'public')));

//db connection
connectdb().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`SERVER running on PORT ${PORT}`)
    })
})

app.get('/', (req,res)=>{
    res.render("mainpage");
});

app.use('/', signuproute);

app.use('/signup', verifyuser)

app.use('/',loginroute);

app.get('/home', authmiddleware,(req,res)=>{
    res.render("homepage");
});

app.use('/home',authmiddleware,upload.single('profile_photo'),menteeform);

app.use('/adminlogin',authmiddleware,userdata);
app.post('/add-remark', async(req,res)=>{
    const date= req.body.date;
    const email = req.body.email;
    const remarks = req.body.remark;
    const combine = `${date} : ${remarks}`;

    try {
        const user = await users.findOneAndUpdate({email: email},{$push:{remark: combine}})
        res.redirect('/adminlogin/userdata');
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
})

app.post('/userdata/:id/edit', async (req, res) => {
    const userId = req.params.id;
    const updatedUserData = req.body; 
    
    try {
        const updatedUser = await users.findByIdAndUpdate(userId, updatedUserData, { new: true });
        res.json(updatedUser); // Send back updated user data as JSON
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Internal Server Error');
    }
});