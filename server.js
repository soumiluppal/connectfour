var app = require('express')();
var http = require('http').Server(app);
var fs = require('fs');
var path = require('path');
var io = require('socket.io')(http);

var connections = 0;
var tempId = '';
var tempUser = '';

app.get('/game.html*', function(req, res) {
  var login = getParameterByName('user1', req.url);
  if(login) {
    
    fs.readFile(__dirname + '/game.html', function (err, data) {
        if (err) console.log(err);
        res.set('Content-Type', 'text/html');
        res.send(data);
      });
  }
  else {
    fs.readFile(__dirname + '/login.html', function (err, data) {
        if (err) console.log(err);
        res.set('Content-Type', 'text/html');
        res.send(data);
      });
  }
});

app.get('/players.html*', function(req, res) {
  var login = getParameterByName('user', req.url);
  if(login) {
    fs.readFile(__dirname + '/players.html', function (err, data) {
        if (err) console.log(err);
        res.set('Content-Type', 'text/html');
        res.send(data);
      });
  }
  else {
    fs.readFile(__dirname + '/login.html', function (err, data) {
        if (err) console.log(err);
        res.set('Content-Type', 'text/html');
        res.send(data);
      });
  }
});

app.get('/*.html', function(req, res) {
  fs.readFile(__dirname + req.url, function (err, data) {
        if (err) console.log(err);
        res.set('Content-Type', 'text/html');
        res.send(data);
      });
});

app.get('', function(req, res) {
  fs.readFile(__dirname + '/login.html', function (err, data) {
    if (err) console.log(err);
    res.set('Content-Type', 'text/html');
    res.send(data);
    });
});

app.get('/', function(req, res) {
  fs.readFile(__dirname + '/login.html', function (err, data) {
    if (err) console.log(err);
    res.set('Content-Type', 'text/html');
    res.send(data);
    });
});

app.get('/*.css', function(req, res) {
  fs.readFile(__dirname + req.url, function (err, data) {
        if (err) console.log(err);
        res.set('Content-Type', 'text/css');
        res.send(data);
      });
});

app.get('/*.png', function(req, res) {
  fs.readFile(__dirname + req.url, function (err, data) {
        if (err) console.log(err);
        res.set('Content-Type', 'text/png');
        res.send(data);
      });
});

app.get('/*.jpg', function(req, res) {
  fs.readFile(__dirname + req.url, function (err, data) {
        if (err) console.log(err);
        res.set('Content-Type', 'text/jpg');
        res.send(data);
      });
});

app.get('/*.gif', function(req, res) {
  fs.readFile(__dirname + req.url, function (err, data) {
        if (err) console.log(err);
        res.set('Content-Type', 'text/gif');
        res.send(data);
      });
});

app.get('/*.js', function(req, res) {
  fs.readFile(__dirname + req.url, function (err, data) {
        if (err) console.log(err);
        res.set('Content-Type', 'text/js');
        res.send(data);
      });
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('token', function(msg){
    console.log(socket.id);
    var tuser = msg.substr(msg.indexOf(','), msg.length);
    var token = msg.substr(0, msg.indexOf(','));
    console.log('message: ' + 'token' + tuser);
    socket.broadcast.emit('token' + tuser, token);
    
  });
  socket.on('readyplayer', function(user) {
    console.log(socket.id);
    connections++;
    if(connections == 2) {
      socket.emit('usersplaying'+user, "user1=" + user + "&user2=" + tempUser);
      socket.to(tempId).emit('usersplaying' , "user1=" + tempUser + "&user2=" + user);
      connections = 0;
    }
    else {
      tempUser = user;
      tempId = socket.id;
    }
  })
});

http.listen(2233, '0.0.0.0', function() {
  console.log('Listening on port: 2233');
});

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

