//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();
const uri = "";

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

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

const userSchema = {
    email: String,
    password: String
};

const User = new mongoose.model("User", userSchema);


app.get('/', function(req, res){
    res.render('home');
});

app.route('/login')
    .get(function(req, res){
        res.render('login');
    })

    .post(async function(req, res){
        try {
            const doc = await Fruit.findOne({email: req.body.username});
            if(doc){
                if(doc.password == req.body.password)
                    res.render('secrets');
            }
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


app.listen(3000, function() {
    console.log("Server started on port 3000.");
});