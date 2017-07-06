/**
 * Created by barak on 05/07/2017.
 * solution for the rapidApi
 * main module for communicate with twitter api.
 * @module communicate_with_Twitter
 */

var express = require('express');
var app = express();
var config = require('./config');
var Twit = require('twit');
var twitterApi = new Twit(config);
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
var posts = {};

/**
 * method for analyzing/rendering posts back to our TweetMe dashboard.
 * @param data - users information according to the routing function.
 * @param res - http.ServerResponse object.
 */
var renderPosts = function (data, res) {
    if (data.statuses.length === 0) {
        console.log("No match");
        res.status(200).send("No match found according to your filter..");
    }
    else {
        //Filter the main data from the posts and render it back to the client.
        var postsArray = data.statuses;
        for (x in postsArray) {
            var obj = {};
            obj.Screen_name = data.statuses[x].user.screen_name;
            obj.ID = data.statuses[x].user.id;
            obj.post_creation = data.statuses[x].created_at;
            obj.location = data.statuses[x].user.location;
            obj.post = postsArray[x].text;
            posts[data.statuses[x].user.name] = obj;
        }
        var sendData = posts;
        posts = {};
        res.status(200).send(sendData);
    }
};




/**
 * Handling get requests to get recently posts in tek aviv with some keyword.
 */
app.get('/keyWord', function (req, res, next) {
    var query = {
        //We can set count as we want or predefine it.
        count: 10,
        //http://www.latlong.net/place/tel-aviv-yafo-israel-7174.html
        geocode: "32.109333,34.855499,10km",
        result_type: "recent"

    };
    var keyword = req.query.keyword;
    query.q = keyword;
    twitterApi.get('search/tweets', query, function (err, data, tRes) {
        //Lets wrap it for passing the res of our router.
        if (err) {
            console.log("Error :  " + err.message);
            res.status(500).send("Opps something wrong just happend..");
        }
        else
            renderPosts(data, res);
    });
});


/**
 * Handling get requests to get recently posts with specific #hashtag.
 */
app.get('/hashtag', function (req, res, next) {
    var query = {
        //We can set count as much as we want ass extra queries as in the Api.
        count: 10,
        result_type: "mixed"
    };
    var text = req.query.hashText;
    query.q = text;
    twitterApi.get('search/tweets', query, function (err, data, tRes) {
        //Lets wrap it for passing the res of our router.
        if (err) {
            console.log("Error :  " + err.message);
            res.status(500).send("Opps something wrong just happend..");
        }
        else
            renderPosts(data, res);
    });
});

/**
 * Handling post requests to post status on our twitter test account.
 */

app.post('/tweet', function (req, res, next) {
    var text = req.body.status;
    var message = {status: text};
    twitterApi.post('statuses/update', message, function (err, data, tRes) {
        if (err)
            res.status(500).send(err.message);
        else
            res.status(200).send("Posted");
    });
});

/**
 * exposing the module to the main module.
 */

module.exports = app;