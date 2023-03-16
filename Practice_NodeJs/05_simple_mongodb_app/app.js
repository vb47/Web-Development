// Initializing libraries
const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
app = express();

// We use dotenv to read .env files.
dotenv.config({path: './config/config.env'});

/******************* Connecting to MongoDB Atlas *********************/

/**
 * Function: Connect to Database with URI given in config/config.env
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`MongoDB Connected`);
  } 
  catch (err) {
    console.log(`Database Error: ${err}`);
    process.exit(1);
  }
}

/************************ Utility Functions **************************/

// Defining how our database might be structured.
const fruitSchema = new mongoose.Schema ({
	name: String,
	rating: Number,
	review: String
});
const Fruit = mongoose.model("fruit", fruitSchema);

/**
 * Function: Uploads one data at a time using fruitSchema format.
 */
const insertElement = async () => {
	const apple = new Fruit({
		name: "Apple",
		rating: 6,
		review: "Prety solid as a fruit."
	});

	apple.save();
}

/**
 * Function: Uploads multiple data at a time using fruitSchema format.
 */
const insertElements = async () => {
	const banana = new Fruit({
		name: "Banana",
		rating: 8,
		review: "Good for weight gains."
	});
	
	const orange = new Fruit({
		name: "Orange",
		rating: 4,
		review: "Too sour for me."
	});

	Fruit.insertMany([banana, orange]);
}

/**
 * Function: Read All data in database
 */
const readDatabase = async () => {

	console.log("Printing all data in collection");
	const data = await Fruit.find();

	if(data)
		console.log(data);
}


/*********************************************************************/


console.log("Trying to connect to server...")
connectDB();

//console.log("Uploading data...");
//insertElement();
//insertElements();

console.log("Reading all data in MongoDB");
readDatabase();

app.listen(5000, console.log("Connected to server."));