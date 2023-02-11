const express = require("express");
const https = require("https");
//var bodyParser = require('body-parser');
const app = express();
const port = 3000;

// View engine setup
app.set('view engine', 'ejs');

app.get("/", function(req, res){
    res.write("<h1>API Practice:</h1> <br>");
    res.write("<ul>");
    res.write("<li>Understanding Enndpoints: <a href='/endpoint'>Link</a></li>");
    res.write("<li>Understanding Paths: <a href='/paths'>Link</a></li>");
    res.write("<li>Understanding Parameters: <a href='/parameters'>Link</a></li>");
    res.send();
});

app.get("/endpoint", function(req, res){

    const url = "https://api.kanye.rest";
    https.get(url, function(resp){
        resp.on("data", function(data){
            const quote = JSON.parse(data);
            //res.send("<h1>" + quote.quote + "</h1>");
            res.render("endpoint", {quoteOfTheDay: quote.quote});
        });

    });
});

app.listen(port, function(req, res){
    console.log("Running server at port " + port);
});