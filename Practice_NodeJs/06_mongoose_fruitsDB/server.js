mongoose = require("mongoose")

mongoose.connect("mongodb://0.0.0.0:27017/fruitsDB");

const fruitSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    review: String
});

const Fruit = mongoose.model("fruit", fruitSchema);

const apple = new Fruit({
    name: "Apple",
    rating: 6.0,
    review: "Pretty solid as a fruit"
});

apple.save();