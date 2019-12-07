var cheerio = require("cheerio");
var axios = require("axios");
var express = require("express");
var mongojs = require("mongojs");
var logger = require('morgan')

var app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

var databaseUrl = "musicnews";
var collections = ["reviews"];

var db = mongojs(databaseUrl, collections);

db.on("error", function (error) {
    console.log("Database Error:", error);
});
app.get("/all", function (req, res) {
    axios.get("https://www.pitchfork.com").then(function (response) {
        var $ = cheerio.load(response.data);

        var results = [];

        $(".album-details").each(function (i, element) {

            var title = $(element).find("h2").text();
            var text = $(element).find('p').text();
            var link = $(element).find("a").attr("href");

            results.push({
                title: title,
                text:text,
                link: link
            });
        });

        console.log(results);
        res.send(results)
    });
});


app.listen(7000, function () {
    console.log("App running on port " + 7000 + "!");
})