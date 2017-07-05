var express = require('express');
var app = express();
var coreModule = require('./javascript/handleTweets');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files

app.use('/', coreModule);
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


