
var express = require("express");
var mongojs = require("mongojs");
var axios = require("axios");
var cheerio = require("cheerio");

var app = express();

var databaseUrl = "music";
var collections = ["news"];

var db = mongojs(databaseUrl, collections);
db.on("error", function (error) {
    console.log("Database Error:", error);
});

app.get("/", function (req, res) {
    res.send("Home Page You Wack Ass");
});

app.get("/all", function (req, res) {
    db.music.find({}, function (error, found) {
        if (error) {
            console.log(error);
        }
        else {
            res.json(found);
        }
    });
});

app.get("/news", function (req, res) {
    axios.get("https://www.pitchfork.com/").then(function (response) {

        var $ = cheerio.load(response.data);
        //var results = [];

        $(".album-details").each(function (i, element) {

            var title = $(element).find("h2").text();
            var artist = $(element).find(".artist-list").text();
            var text = $(element).find('p').text();
            var link = $(element).find("a").attr("href");

            if (title && artist && text && link) {
                db.music.insert({
                    title: title,
                    artist: artist,
                    text: text,
                    link: link
                }, function (err, inserted) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log(inserted);
                    }
                })
            }
        })
    })
    res.send("Scrape Complete");
});
app.listen(3000, function () {
    console.log("App running on port 3000!");
});
