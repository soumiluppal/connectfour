function disableButton(id) {
  document.getElementById(id).disabled = true;
  document.getElementById("img1").style.visibility = "visible";
  var url = window.location.href;
  var user = getParameterByName('user', url);
  console.log("Username: " + user);
  var socket = io();
  socket.emit('readyplayer', user);
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