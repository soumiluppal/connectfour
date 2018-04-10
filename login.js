var idUser;
var passUser;
var cpassUser;

function clickLogin() {
	document.getElementById('id01').style.display='block';
}

function clickRegister() {
	document.getElementById('id02').style.display='block';
}

function closeDivlogin() {
	document.getElementById('id01').style.display='none';
}

function closeDivregister() {
	document.getElementById('id02').style.display='none';
}

function getLoginInfo() {
	
	idUser = document.getElementById("userId").value;;
	passUser = document.getElementById("userPass").value;

	window.alert("Your id : " + idUser + " Your password : " + passUser);

}

function getRegisterInfo() {
	
	idUser = document.getElementById("userId2").value;
	passUser = document.getElementById("userPass2").value;
	cpassUser = document.getElementById("userPass3").value;
	var myRegEx = new RegExp("[^a-z0-9\d]+");
	if(myRegEx.test(idUser) == false && idUser.length > 3) {
		if(!myRegEx.test(passUser) && passUser.length > 7) {
			if(passUser.localeCompare(cpassUser) == 0) {
				firebase.auth().createUserWithEmailAndPassword(idUser + "@connect4.com", passUser).catch(function(error) {
  					var errorCode = error.code;
  					var errorMessage = error.message;
				});
				window.alert("Your id : " + idUser + " Your password : " + passUser);
			}
			else {
				window.alert("Password does not match");
			}
		}
		else {
			window.alert("Password is invalid. Only use numbers or letters. Password needs to be atleast 4 characters long.");
		}
	}
	else {
		window.alert("Username is invalid. Only use numbers or letters. Username needs to be atleast 4 characters long. " + idUser);
	}

}