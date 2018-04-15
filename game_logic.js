
$(document).ready(function() {
	//TODO: Draw a grid
	
	const connect4 = new Connect4('#board');
	document.getElementById("name").value = getParameterByName("user1", window.location.href);
});

var socket = io();

socket.on('chatmsg' + getParameterByName('user2', window.location.href), msg) {
	document.getElementById("chatlog").value += msg;
}

function sendChat() {
	var str = document.getElementById("message").value;
	var user = document.getElementById("name").value;
	var msg = user + ": " + str + "\n"
	document.getElementById("chatlog").value += msg;
	sendMsg(msg, socket);
}

function sendMsg(msg, socket) {
    socket.emit('chatmsg', msg + "," + getParameterByName('user2', window.location.href));
    return false;
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