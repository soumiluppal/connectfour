var idUser;
var passUser;

function clickLogin() {
	document.getElementById('id01').style.display='block';
}

function closeDiv() {
	document.getElementById('id01').style.display='none';
}
function getLoginInfo(){
	window.alert("testing");
	idUser = document.getElementById("userId");
	passUser = document.getElementById("userPass");

	window.alert("Your id : " + idUser.value + " Your password : " + passUser.value);


}