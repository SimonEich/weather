const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname+"/index.html")
})


app.post("/", function(req, res){
  console.log(req.body.cityName);
  const query = req.body.cityName;
  const api = "1fc14362aae6eab6f935474def8d2a32"
  const units = "metric"
  const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+units+"&appid="+api
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherdata = JSON.parse(data)
      const temp = weatherdata.main.temp
      const weatherdiscription = weatherdata.weather[0].description
      console.log(temp);
      console.log(weatherdiscription);
      const icon =  weatherdata.weather[0].icon
      const imgurl =  "http://openweathermap.org/img/wn/"+icon+"@2x.png"
      res.write("<h1>Actually are "+temp+" degrees in "+query+"</h1>");
      res.write("<p>Current Weather:  "+ weatherdiscription +"<p>");
      res.write("<img src="+imgurl+">");
      res.send();
    })
  })
})
//const query = "puerto+escondido"
//const api = "1fc14362aae6eab6f935474def8d2a32"
//const units = "metric"
//const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+"&appid="+api
//https.get(url, function(response){
//  console.log(response.statusCode);
//
//  response.on("data", function(data){
//    const weatherdata = JSON.parse(data)
//    const temp = weatherdata.main.temp
//    const weatherdiscription = weatherdata.weather[0].description
//    console.log(temp);
//    console.log(weatherdiscription);
//    const icon =  weatherdata.weather[0].icon
//    const imgurl =  "http://openweathermap.org/img/wn/"+icon+"@2x.png"
//    res.write("<h1>Actually are "+temp+" degrees in Puerto Escondido</h1>");
//    res.write("<p>Current Weather:  "+ weatherdiscription +"<p>");
//    res.write("<img src="+imgurl+">");
//    res.send()

app.listen(3000, function(){
  console.log("Server ist running on port 3000")
})
