function disableButton(id) {
  document.getElementById(id).disabled = true;
  document.getElementById("img1").style.visibility = "visible";
  document.getElementById("queue").style.visibility = "visible";
  var url = window.location.href;
  var user = getParameterByName('user', url);
  console.log("Username: " + user);
  var socket = io();
  socket.emit('readyplayer', user);
  socket.on('usersplaying', function(ext) {
    console.log(ext);
    window.open("game.html?" + ext, '_self', false);
  });
  socket.on('usersplaying'+user, function(ext) {
    console.log(ext);
    window.open("game.html?" + ext, '_self', false);
  });
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}