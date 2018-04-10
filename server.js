var app = require('express')();
var http = require('http').Server(app);
var fs = require('fs');

app.get('/login.html', function(req, res) {
  fs.readFile(__dirname + '/login.html', function (err, data) {
        if (err) console.log(err);
        res.set('Content-Type', 'text/html');
        res.send(data);
      });
});

app.get('/login_style.css', function(req, res) {
  fs.readFile(__dirname + '/login_style.css', function (err, data) {
        if (err) console.log(err);
        res.set('Content-Type', 'text/css');
        res.send(data);
      });
});

app.get('/cross.png', function(req, res) {
  fs.readFile(__dirname + '/cross.png', function (err, data) {
        if (err) console.log(err);
        res.set('Content-Type', 'text/png');
        res.send(data);
      });
});

app.get('/background.jpg', function(req, res) {
  fs.readFile(__dirname + '/background.jpg', function (err, data) {
        if (err) console.log(err);
        res.set('Content-Type', 'text/jpg');
        res.send(data);
      });
});

app.get('/login.js', function(req, res) {
  fs.readFile(__dirname + '/login.js', function (err, data) {
        if (err) console.log(err);
        res.set('Content-Type', 'text/js');
        res.send(data);
      });
});

http.listen(2233, function() {
  console.log('Listening on port: 2233');
});

