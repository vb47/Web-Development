// import packages
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();
const uri = "mongodb://Vaibhav1:Vaibhav1.mongodb23@ac-pr1cjml-shard-00-00.qrpn2uc.mongodb.net:27017,ac-pr1cjml-shard-00-01.qrpn2uc.mongodb.net:27017,ac-pr1cjml-shard-00-02.qrpn2uc.mongodb.net:27017/employee-data?ssl=true&replicaSet=atlas-146fiy-shard-0&authSource=admin&retryWrites=true&w=majority";

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

var firstNameList = [], lastNameList = [], emailList = [], mobileList = [], salaryList = [];
var searchFName = "", searchLName = "";


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
    firstName: String,
    lastName: String,
    email: String,
    mobile: String,
    salary: String
});

const User = new mongoose.model("User", userSchema);

/********************************* Database Utility Functions *************************************/

/**
 * Function: Read All data in database
 */
const readDatabase = async () => {

	//console.log("Printing all data in collection");
	const data = await User.find().exec();

	if(data){
        //console.log(data);
        firstNameList = [];
        lastNameList = [];
        emailList = [];
        mobileList = [];
        salaryList = [];

        for(let i=0; i< data.length; i++){
            firstNameList.push(data[i].firstName);
            lastNameList.push(data[i].lastName);
            emailList.push(data[i].email);
            mobileList.push(data[i].mobile);
            salaryList.push(data[i].salary);
        }
    }
}

/**
 * Function: Uploads one data at a time using fruitSchema format.
 */
const insertData = async (firstName, lastName, email, mobile, salary) => {
	const newUser = new User({
		firstName: firstName,
        lastName: lastName,
        email: email,
        mobile: mobile,
        salary: salary
	});

	newUser.save();
}

/**
 * Function: Function to update a data into the database
 */
const updateData = async (findEmail, firstName, lastName, email, mobile, salary) => {
    console.log("Updating table with email: " + findEmail);
    const res = await User.updateOne({email: findEmail}, {firstName: firstName, lastName: lastName, email: email, mobile: mobile, salary: salary});
    console.log(res);
}

/**
 * Function: Function to delete one data
 */
const deleteOneData = async (email) => {
	console.log("Deleting data with id - " + email);
	const deletedCount = await User.deleteOne({email: email});
	console.log(deletedCount);
}

/**
 * Function: Function to delete one data
 */
const findEmployeeData = async (fname, lname) => {
    if(fname == "" & lname == ""){
        readDatabase();
        return;
    }
	console.log("Finding " + fname + " " + lname);
	const resp = await User.find({firstName: fname, lastName: lname});
	console.log(resp);
    if(resp.length > 0){
        firstNameList = [];
        lastNameList = [];
        emailList = [];
        mobileList = [];
        salaryList = [];

        firstNameList.push(resp[0].firstName);
        lastNameList.push(resp[0].lastName);
        emailList.push(resp[0].email);
        mobileList.push(resp[0].mobile);
        salaryList.push(resp[0].salary);
    }
    else {
        firstNameList = [];
        lastNameList = [];
        emailList = [];
        mobileList = [];
        salaryList = [];
    }
}

/******************************** Routing urls with views ****************************************/

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

app.route('/')
.get(async function(req, res){
    //updateData("vaibhav@psl.com", "Vaibhav", "Alur", "vaibhavalur@psl.com", "1234567890", "10000")

    readDatabase();
    //console.log(data);
    //insertData("Vaibhav", "Alur", "vaibhav@psl.com", "1234567890", "10000");
    await sleep(1000);
    res.render("index.ejs", 
    {
        firstNameList: firstNameList, 
        lastNameList: lastNameList, 
        emailList: emailList, 
        mobileList: mobileList, 
        salaryList: salaryList, 
        searchFName: searchFName, 
        searchLName: searchLName
    });
});


app.post('/add', async (req, res) => {
    insertData(req.body.firstName, req.body.lastName, req.body.email, req.body.mobile, req.body.salary);
    await sleep(1500);
    res.redirect('/');
});

app.post('/edit', async (req, res) => {
    updateData(req.body.email, req.body.firstName, req.body.lastName, req.body.email, req.body.mobile, req.body.salary);
    await sleep(1500);
    res.redirect('/');
});

app.post('/search', async (req, res) => {
    searchFName = req.body.fname;
    searchLName = req.body.lname;
    findEmployeeData(searchFName, searchLName);
    await sleep(2000);
    res.render("index.ejs", 
    {
        firstNameList: firstNameList, 
        lastNameList: lastNameList, 
        emailList: emailList, 
        mobileList: mobileList, 
        salaryList: salaryList, 
        searchFName: searchFName, 
        searchLName: searchLName
    });
});

app.post('/delete', async (req, res) => {
    console.log("Deleting " + req.body.email);
    deleteOneData(req.body.email);
    await sleep(2000);
    res.redirect('/');
});








/****************************** Listening to port 3000  ****************************************/

app.listen(3000, function() {
    console.log("Server started on port 3000.");
});

/************************************************************************************************/