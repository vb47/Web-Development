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
const updateData = async (fruitName, value) => {
    console.log("Updating " + fruitName + " to " + value + ".");
    const res = await Fruit.updateOne({_id: "641357079e047d84238965a1"}, {name: value, rating: 2.0, review: "Orangeeeeee"});
    console.log(res.matchedCount);
}

app.listen(3000, async () => {
    console.log("Server connected at port 3000")
    connectDB();
    //insertElement();
    updateData("Banana", "Worange");
    await readDatabase();
});