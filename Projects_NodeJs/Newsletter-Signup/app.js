const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/views/sign-up.html");
});

app.post("/signup", function(req, res){
    const api = "f5b85a7ef14ff62563aa6a12edbe860d-us14";
    const audianceId = "c4d8d63846";
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_list: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);

    const url = "https://us14.api.mailchimp.com/3.0/" + "/lists/" + audianceId;
    const options = {
        method: "POST",
        auth: "vaibhav:" + api
    }

    const request = https.request(url, options, function(response){

        if(response.statusCode == 200)
            res.send("<h1>SUCCESS</h1>");
        else
            res.send("<h1>FAILED</h1>");

        response.on("data", function(d){
            console.log(JSON.parse(d));
        });
    });

    request.write(jsonData);
    request.end();

    
});

app.listen(port, function(){
    console.log("Listening to port " + port);
});