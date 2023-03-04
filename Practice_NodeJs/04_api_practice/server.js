const express = require("express");
const https = require("https");
var bodyParser = require('body-parser');
const app = express();
const port = 3000;

// View engine setup
app.set('view engine', 'ejs');
// We have to tell Nodejs that we are using body-parser
// know more here - https://stackoverflow.com/questions/55558402/what-is-the-meaning-of-bodyparser-urlencoded-extended-true-and-bodypar
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.write("<h1>API Practice:</h1> <br>");
    res.write("<ul>");
    res.write("<li>Understanding Enndpoints: <a href='/endpoint'>Link</a></li>");
    res.write("<li>Understanding Paths: <a href='/paths'>Link</a></li></ul>");
    res.write("<li>Understanding Authentication: <a href='/authentication'>Link</a></li></ul>");
    res.send();
});

/*
 * Endpoint is the url through which we can send requests to get data.
 * Endpoints is the simplest form of API call.
 * 
 * Consider an API - [Kanye Rest](https://kanye.rest/), 
 * here the endpoint is given in website which is - [https://api.kanye.rest](https://api.kanye.rest/). 
 * When you visit this endpoint it prints back the data it is sending.**
 */
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

/*
 * Paths And Parameters
 * Paths are the extentions to the url. 
 * If you want to get data by sending parameters specified in docs, we use paths.
 * To send any parameters  - https://<url>/<path>?<parameter_name>=<value>
 * 
 * Consider the JokeAPI, that sends random jokes, 
 * if you go to documentation, you will get url and paths through which you can post parameters.
 * They have several categories to get a specific joke.
 * Know more about the API - https://sv443.net/jokeapi/v2/
 * In this type of API we use endpoints we will get error as it needs some parameters.
 */
app.get("/paths", function(req, res){
    res.render("paths");
});

app.post("/joke", function(req, res){
    var url = "https://v2.jokeapi.dev/joke/";
    //console.log(req.body);
    if(req.body.Any == "true")
        url += "Any";
    else {
        if(req.body.Programming == "true")
            url += "Programming,";
        if(req.body.Misc == "true")
            url += "Misc,";
        if(req.body.Dark == "true")
            url += "Dark,";
        if(req.body.Pun == "true")
            url += "Pun,";
        if(req.body.Spooky == "true")
            url += "Spooky,";
        
        url = url.slice(0,-1);
    }

    url += "?blacklistFlags=";

    if(req.body.nsfw=="true")
        url += "nsfw,";
    if(req.body.religious=="true")
        url += "religious,";
    if(req.body.political=="true")
        url += "political,";
    if(req.body.racist=="true")
        url += "racist,";
    if(req.body.sexist=="true")
        url += "sexist,";

    url = url.slice(0,-1);
    console.log(url);

    https.get(url, function(resp){
        resp.on("data", function(data){
            const quote = JSON.parse(data);
            console.log(quote);
            res.render("joke", {joke: quote.setup, delivery: quote.delivery, onlyJoke: quote.joke});
        });
    });
});

/**
 * Everytime we make a request to API, they have to be able to identify you as a developer and
 * keep track of how often you use the resources of the server.
 * This feature is very helpful to monitize the services provided by the api.
 * 
 * Consider the API - OpenWeather Map
 * We can access Weather Info upto 60 requests per minute for free users.
 */
app.get("/authentication", function(req, res){
    const key = "79ebe063e419876aefd1495969b868cb";
    var APIurl = "https://api.openweathermap.org/data/2.5/weather?q=Verna,IN&units=metrics&appid=";

    APIurl += key;

    console.log(APIurl);
    https.get(APIurl, function(resp){
        resp.on("data", function(data){
            const currentWeather = JSON.parse(data);
            console.log("Current Weather Data: ");
            console.log(currentWeather);
            res.render("weather", {weatherData: currentWeather.weather[0].description + " | " + currentWeather.main.temp + " Celcius"});
        });
    });
});

app.listen(port, function(req, res){
    console.log("Running server at port " + port);
});