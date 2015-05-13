var express = require('express')
    , app = express()
    , config = require('./config')
    , server = require('http').createServer(app)
    , bodyParser = require('body-parser')
    , mongoose = require('mongoose');

mongoose.connect(config.mongo.uri + '/' + config.mongo.db);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./routes')(app);

server.listen(config.port, function () {
    console.log('Express server listening on %d', config.port);
});

exports = module.exports = app;
