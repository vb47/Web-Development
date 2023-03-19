//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require('mongoose-encryption'); 


// Configuring Server+
const app = express();
const uri = "mongodb://Vaibhav1:Vaibhav1.mongodb23@ac-pr1cjml-shard-00-00.qrpn2uc.mongodb.net:27017,ac-pr1cjml-shard-00-01.qrpn2uc.mongodb.net:27017,ac-pr1cjml-shard-00-02.qrpn2uc.mongodb.net:27017/userCredentials?ssl=true&replicaSet=atlas-146fiy-shard-0&authSource=admin&retryWrites=true&w=majority";

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));


/*********************************** Connecting to database *****************************************/
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Successfully connected to MongoDB database.")
    } catch(err) {
        console.log("Failed connecting to MongoDB...");
        console.log(err);
    }
}
connectDB();

/***************************** Defining Structure of Database *************************************/
const userSchema = mongoose.Schema({
    email: String,
    password: String
});

const secret = "Thisismylittlesecret";

userSchema.plugin(encrypt, {secret: secret, encryptedFields: ['password']});

const User = new mongoose.model("User", userSchema);


/******************************** Routing urls with views ****************************************/
app.get('/', function(req, res){
    res.render('home');
});

app.route('/login')
    .get(function(req, res){
        res.render('login');
    })

    .post(async function(req, res){
        try {
            const doc = await User.findOne({email: req.body.username});
            if(doc){
                if(doc.password == req.body.password)
                    res.render('secrets');
            }
            else 
                res.send('<h1>Wrong Credentials</h1>');
        } catch(err) {
            console.log(err);
        }
    });

app.route('/register')
    .get(function(req, res){
        res.render('register');
    })

    .post(async function(req, res){
        const newUser = new User({
            email: req.body.username,
            password: req.body.password
        });
        try {
            await newUser.save();
            res.render('secrets');
        }
        catch (err) {
            console.log(err);
        }
        
    });

/****************************** Listening to port 3000  ****************************************/

app.listen(3000, function() {
    console.log("Server started on port 3000.");
});

/************************************************************************************************/