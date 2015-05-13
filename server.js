var express = require('express')
    , app = express()
    , server = require('http').createServer(app)
    , port = process.env.PORT || 80
    , bodyParser = require('body-parser')
    , mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/notes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./routes')(app);

server.listen(port, function () {
    console.log('Express server listening on %d', port);
});

exports = module.exports = app;
