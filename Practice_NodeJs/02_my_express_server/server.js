import express from "express"; // modern ES Lint import style
const app = express();
const port = 3000;

app.get("/", function(request, response){
    response.send("<h1>Hello, World!</h1>");
});

app.get("/contact", function(req, res){
    res.send("<h1>Connect me at vsalur22@gmail.com</h1> ")
});

app.get("/about", function(req, res){
    res.send("<h1>Vaibhav Alur. Naam hi kaafi he bhai!</h1> ")
});


// We use app.listen to run our server on specified port. 
// We call a function that runs on backend while the server is live.
app.listen(port, function(){
    console.log("Server is running on port 3000.");
 });

 // Use nodemon to run automate restarting of server.
 // To install: npm install -g nodemon
 // nodemon server.js
