var cheerio = require("cheerio");
var axios = require("axios");
var express = require("express");
var mongojs = require("mongojs");

var app = express();

var databaseUrl = "musicnews";
var collections = ["reviews"];

var db = mongojs(databaseUrl, collections);

db.on("error", function(error) {
  console.log("Database Error:", error);
});
app.get("/scraped", function(req,res){
    res.send("testing")});
    app.get("/all", function(req,res){
        db.reviews.find({}, function (err,found) {
            if (err){
                console.log(err)
            }
            else{
                res.json(found)
            }
        })
        });


axios.get("https://www.pitchfork.com").then(function(response) {

  var $ = cheerio.load(response.data);

  var results = [];

  $(".album-details").each(function(i, element) {

    var title = $(element).find("h2").text();
    var text= $(element).f
    var link = $(element).find("a").attr("href");

    results.push({
      title: title,
      link: link
    });
  });

  console.log(results);
});


app.listen(7000, function() {
    console.log("App running on port " + 7000 + "!");
  })