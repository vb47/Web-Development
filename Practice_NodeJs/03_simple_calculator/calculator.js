const express = require("express");
const app = express();
const port = 3000;

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    var num1 = req.body.num1;
    var num2 = req.body.num2;
    res.send("<h1>Result = " + (parseInt(num1)+parseInt(num2) + "</h1>"));
});

app.listen(port, function(){
    console.log("Server is running at port " + port + ".");
});