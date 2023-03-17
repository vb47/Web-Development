// Initializing libraries
const mongoose = require('mongoose');
const express = require('express');
app = express();

// Defining database structure
const fruitSchema = new mongoose.Schema ({
	name: {
		type: String,
		required: [true, "please check your data entry, no name specified!"]
	},
	rating: {
		type: Number,
		min: 0,
		max: 10
	},
	review: String
});

const Fruit = mongoose.model("fruit", fruitSchema);

/******************* Connecting to MongoDB Atlas *********************/

/**
 * Function: Connect to Database with URI given in config/config.env
 */
const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb://Vaibhav1:Vaibhav1.mongodb23@ac-pr1cjml-shard-00-00.qrpn2uc.mongodb.net:27017,ac-pr1cjml-shard-00-01.qrpn2uc.mongodb.net:27017,ac-pr1cjml-shard-00-02.qrpn2uc.mongodb.net:27017/fruitsDB?ssl=true&replicaSet=atlas-146fiy-shard-0&authSource=admin&retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
        });
        console.log(`MongoDB Connected.`);
    } 
    catch (err) {
        console.log(`Database Error: ${err}`);
        process.exit(1);
    }
}

/************************ Utility Functions **************************/

/**
 * Function: Uploads one data at a time using fruitSchema format.
 */
const insertElement = async () => {
	const mango = new Fruit({
		name: "Mongo",
		rating: 11.0,
		review: "My favorite fruit."
	});

	mango.save();
}

/**
 * Function: Read All data in database
 */
const readDatabase = async () => {

	console.log("Printing all data in collection");
	const data = await Fruit.find().exec();

	if(data)
		console.log(data);
}

/**
 * Function: Function to update a data into the database
 */
const updateData = async (id, value, rating, review) => {
    console.log("Updating " + fruitName + " to " + value + ".");
    const res = await Fruit.updateOne({_id: id}, {name: value, rating: rating, review: review});
    console.log(res.matchedCount);
}

/**
 * Function: Function to update a data into the database
 */
const updateManyData = async (name, value, rating, review) => {
    console.log("Updating " + fruitName + " to " + value + ".");
    const res = await Fruit.updateMany({_name: name}, {name: value, rating: rating, review: review});
    console.log(res.matchedCount);
}

/**
 * Function: Function to delete one data
 */
const deleteOneData = async (id) => {
	console.log("Deleting data with id - " + id);
	const deletedCount = await Fruit.deleteOne({_id: id});
	console.log("Deleted " + deletedCount + " document.");
}

/**
 * Function: Function to delete many documents at a time
 */
const deleteManyData = async (name) => {
	console.log("Deleting many data, ");
	const deletedCount = await Fruit.deleteMany({name: name});
	console.log("Deleted " + deletedCount + " documents.");
}

app.listen(3000, () => {
    console.log("Server connected at port 3000")
    connectDB();
    //insertElement();
    //updateData("641357079e047d84238965a1", "Worange", 2.0, "Orangeeeeee");
	//updateManyData("Apple", "Apple", 5.0, "I love apple milkshake though.");
	//deleteOneData(""); // TODO: add id here
	//deleteManyData("Apple"); // TODO: try this after delete One Data.
	readDatabase();
});