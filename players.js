function disableButton(id) {
  document.getElementById(id).disabled = true;
  document.getElementById("img1").style.visibility = "visible";
  document.getElementById("queue").innerHTML = "Matchmaking";
  var url = window.location.href;
  var user = getParameterByName('user', url);
  var sec = getParameterByName('sec', url)
  var password = atob(sec);
  //var password = hex_to_ascii(CryptoJS.AES.decrypt(sec, user));
    console.log("Username: " + user + "\nPassword: " + password);
  firebase.auth().signInWithEmailAndPassword(user + "@connect4.com", password).then(function() {
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
    //window.open("players.html?" + "user=" + idUser, '_self', false);
  }).catch(function(error) {
  // Handle Errors here.
      //var errorCode = error.code;
      //var errorMessage = error.message;
      //window.alert(errorMessage);
      window.open("login.html", '_self', false);
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

function hex_to_ascii(str1)
 {
  var hex  = str1.toString();
  var str = '';
  for (var n = 0; n < hex.length; n += 2) {
    str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
  }
  return str;
 }