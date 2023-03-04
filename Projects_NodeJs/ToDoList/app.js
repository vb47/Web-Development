const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var listItems = [];

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.render("index.ejs", {newListItems: listItems});
});

app.post("/", (req, res) => {
    //console.log(req.body);
    listItems.push(req.body.newItem);
    res.redirect("/");
});

app.listen(3000, function(){
    console.log("server is running at port 3000.");
});