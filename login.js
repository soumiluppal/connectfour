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

var input = document.getElementById("userPass");
input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("confirmLogin").click();
    }
});

input = document.getElementById("userPass2");
input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("confirmRegister").click();
    }
});

input = document.getElementById("userPass3");
input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("confirmRegister").click();
    }
});

input = document.getElementById("userId");
input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("confirmLogin").click();
    }
});

input = document.getElementById("userId2");
input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("confirmRegister").click();
    }
});

function getLoginInfo() {
	
	idUser = document.getElementById("userId").value;;
	passUser = document.getElementById("userPass").value;
	firebase.auth().signInWithEmailAndPassword(idUser + "@connect4.com", passUser).then(function() {
		window.open("players.html?" + "user=" + idUser, '_self', false);
	}).catch(function(error) {
  // Handle Errors here.
  		var errorCode = error.code;
  		var errorMessage = error.message;
  		window.alert(errorMessage);
	});
	

}

function getRegisterInfo() {
	
	idUser = document.getElementById("userId2").value;
	passUser = document.getElementById("userPass2").value;
	cpassUser = document.getElementById("userPass3").value;
	var myRegEx = new RegExp("[^a-z0-9\d]+");
	if(myRegEx.test(idUser) == false && idUser.length > 3) {
		if(!myRegEx.test(passUser) && passUser.length > 7) {
			if(passUser.localeCompare(cpassUser) == 0) {
				firebase.auth().createUserWithEmailAndPassword(idUser + "@connect4.com", passUser).then(function() {
					window.open("players.html?" + "user=" + idUser, '_self', false);
				}).catch(function(error) {
  // Handle Errors here.
  				var errorCode = error.code;
  				var errorMessage = error.message;
			});
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