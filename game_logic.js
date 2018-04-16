
$(document).ready(function() {
	//TODO: Draw a grid
	
	const connect4 = new Connect4('#board');
	document.getElementById("name").value = getParameterByName("user1", window.location.href);
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