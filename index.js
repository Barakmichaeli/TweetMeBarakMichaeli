/**
 * main entry JS file - starting the application and
 * let core modules to mount on some paths.
 */

var coreModule = require('./javascript/handleTweets');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));


/**
 * Set coreModule to handle requests to the server.
 */
app.use('/', coreModule);


/**
 * Starting listening to port 5000
 */
app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});


