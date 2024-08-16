const express = require("express")
const https = require("https");  // Native Node Module
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html"); 
});

app.post("/", function(req,res){
    console.log(req.body.cityName);
    
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Bathinda&appid=7218bd04dfef7ffe5e618544305745ae&units=metric"

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){       // Hold data from Response
            const weatherData= JSON.parse(data)  // Converting into Javascript Object

            const temp = weatherData.main.temp    // Specific Pieces of Data

            const weatherDesrciption = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"  // String Concatenation

            res.write("<p>The weather is currently " + weatherDesrciption + "</p>");
            res.write("<h1>The temperature in Bathinda is " + temp + " degrees Celsius.</h1>");
            res.write("<img src=" + imageURL + ">");
            res.send()  // There can be only one res.send.
        })
    })
})






app.listen(3000, function(){
    console.log("Server is running on port 3000.");
})