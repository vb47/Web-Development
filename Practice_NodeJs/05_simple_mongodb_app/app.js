const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
app = express();

dotenv.config({ path: './config/config.env' });

const connectDB = async () => {
  try {
	// uri = process.env.MONGO_URI
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(`MongoDB Connected`);
  } catch (err) {
    console.log(`Database Error: ${err}`);
    process.exit(1);
  }
}

const uploadData = async () => {
	// Defining how our database might be structured.
	const fruitSchema = new mongoose.Schema ({
		name: String,
		rating: Number,
		review: String
	});

	const Fruit = mongoose.model("fruit", fruitSchema);

	const apple = new Fruit({
		name: "Apple",
		rating: 6,
		review: "Prety solid as a fruit."
	});

	apple.save();

	console.log("Printing all data in collection");
	const data = await Fruit.find();

	if(data)
		console.log(data);
	
}


console.log("Trying to connect to server...")
connectDB();

console.log("Uploading data...");
uploadData();

app.listen(5000, console.log("Connected to server."));