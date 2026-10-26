let intro = document.querySelector('.intro');
let logo = document.querySelector('.logo-header');
let logoSpan = document.querySelectorAll('.logo');

window.addEventListener('DOMContentLoaded', ()=>{

    setTimeout(()=>{
        logoSpan.forEach((span, idx)=>{
            setTimeout(()=>{
                span.classList.add('active');
            }, (idx + 1) * 400)
        });

        setTimeout(() => {
            logoSpan.forEach((span, idx)=>{
                span.classList.remove('active');
                span.classList.add('fade');
            }, (idx + 1) * 50)
        },2000)


        setTimeout(()=>{
            intro.style.top ='-100vh';
        }, 2300)
    })
})
/* function showPwdWin will show the Password Rule window */
function showPwdWin () {
	var pwdHelpWin = document.getElementById("pwdHelpWin"); /*get element "pwdHelpWin" */
	var scrnOverlay = document.getElementById("scrnOverlay");	/*get element "scrnOverlay" */

	pwdHelpWin.style.display = "block";    			/*display element pwdHelpWin*/
	scrnOverlay.style.visibility = "visible";  		/*hide element scrnOverlay */
}

function hidePwdWin () {
	var pwdHelpWin = document.getElementById("pwdHelpWin"); 	/*get element "pwdHelpWin" */
	var scrnOverlay = document.getElementById("scrnOverlay");  /*get element "scrnOverlay" */

	pwdHelpWin.style.display = "none";  	/* hide element pwdHelpWin by setting the CSS property display as "none" */
	scrnOverlay.style.visibility = "hidden";  	/* display element scrnOverlay by setting the CSS property visibility as "hidden" */
}

function validate() {
	var sid = document.getElementById("sid").value;
	var pwd1 = document.getElementById("pwd1").value;
	var pwd2 = document.getElementById("pwd2").value;
	var uname = document.getElementById("uname").value;

	var genm = document.getElementById("genm").checked;
	var genf = document.getElementById("genf").checked;
	var geno = document.getElementById("geno").checked;

	var con = document.getElementById("country-select").value;
	var genre = document.getElementById("genre").value;

	var errMsg = "";					/* stores the error message */
	var result = true;					/* assumes no errors */
	var pattern = /^[a-zA-Z ]+$/;		/* regular expression for letters and spaces only */
	var symbolPattern = /[^a-zA-Z0-9]/;

	if (sid == "") {
		errMsg += "Email cannot be empty.\n";
	}
	if (pwd1 == "") {
		errMsg += "Password cannot be empty.\n";
	}
	if (pwd1.length <= 10) {
		errMsg += "Password is too short.\n";
	}
	if (!symbolPattern.test(pwd1)) {
		errMsg += "Password doesn't contain symbols.\n";
	}
	if (pwd2 == "") {
		errMsg += "Retype password cannot be empty.\n";
	}
	if (uname == "") {
		errMsg += "Username cannot be empty.\n";
	}
	if (!genm && !genf && !geno) {
		errMsg += "A gender must be selected.\n";
	}
	if (sid.indexOf('@') == 0 ) {
		errMsg += "Email cannot start with an @ symbol.\n";
	}
	if (sid.indexOf('@') < 0 ) {
		errMsg += "Email must contain an @ symbol.\n";
	}
	if (pwd1 != pwd2) {
		errMsg += "Passwords do not match.\n";
	}
	if (! uname.match (pattern)) {
		errMsg += "Username contains symbols.\n";
	}
	if (con == "" || con == "defualt") {
		errMsg += "Country/Region needs to be selected.\n";
	}
	if (genre == "") {
		errMsg += "Genre needs one selection.\n";
	}
	/* Display error message any error(s) is/are detected */
	if (errMsg != "") {
		alert (errMsg);
		result = false;
	} 
	return result;
}

/* link HTML elements to corresponding event function */
function init () {
	var pwdHelpBtn = document.getElementById("pwdHelpBtn");  /* get element "pwdHelpBtn" */
	var pwdHelpClose = document.getElementById("pwdHelpClose");  /* get element "pwdHelpClose" */
		
	pwdHelpBtn.onclick = showPwdWin;	/* link function showPwdWin to the onclick event of button pwdHelpBtn */
	pwdHelpClose.onclick = hidePwdWin;  	/* links function hidePwdWin to the onclick event of button pwdHelpClose*/

	var regtest = 	document.getElementById("regtest");	/* link the variables to the HTML elements */
	regtest.onsubmit = validate;	/* assigns functions to corresponding events */
}

window.onload = init;