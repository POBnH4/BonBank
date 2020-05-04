let baseURL = "api";
var modal = document.getElementById('id01');
var registerModal = document.getElementById('id02');
var transferModal = document.getElementById('id03');

var currentUserID = "";

var BitcoinPrice = 7165.22;

window.onclick = function(event) { // When the user clicks anywhere outside of
	// the modal, close it
	if (event.target == modal) {
		modal.style.display = "none";
	}
	if (event.target == registerModal) {
		registerModal.style.display = "none";
	}
	if (event.target == transferModal) {
		transferModal.style.display = "none";
	}
}

function hello() {
	alert("hello from index.js");
	console.log("hello from index.js");
}

var currentUser = {
	id : "",
	name : "",
	email : "",
	total : "",
	savingsAccount : "",
	cryptoAccount : "",
	bankAccount : "",
	transactions : "",
	transactionsName : ""
}

try {
	$(function() {
		init();
	});
} catch (e) {
	alert("*** jQuery not loaded. ***");
}

function init() {
	console.log("jQuery is defined!")
}

function cancelUser() {
	$("#UserDetailsDialog").dialog("close");
}

function cancelUserFunc() {
	$("#updateDeleteDialog").dialog("close");
}

function deleteUser() {

	let user = JSON.parse(localStorage.currentUser);
	console.log("in the delete method | id = " + user["id"])

	let url = baseURL + "/user/delete/" + user["id"];
	let settings = {
		type : "DELETE"
	};
	$.ajax(url, settings);
}

function onClickUpdate() {
	let ol = document.getElementById("Users")
	let items = ol.getElementsByTagName("li");
	for (let i = 0; i < items.length; i++) {
		if (items[i].classList[0] == "selected") {
			updateUser(items[i].id);
			console.log("in the update click")
		}
	}
}

function clearSaveUserValues() {
	$("#dateOfBirth").val("");
	$("#surname").val("");
	$("#forename").val("");
	$("#jobTitle").val("");
	$("#qualificationTitle").val("");
	$("#dateCompleted").val("");
	$("#expiryDate").val("");
}

function clearUpdatedUserValues() {
	$("#newDateOfBirth").val("");
	$("#newSurname").val("");
	$("#newForename").val("");
	$("#newJobTitle").val("");
	$("#newQualificationTitle").val("");
	$("#newDateCompleted").val("");
	$("#newExpiryDate").val("");
}

// save an User using the User service, given its position
function updateUser() {
	let name = $("#newName").val();
	let email = $("#newEmail").val();
	let password = $("#newPassword").val();

	let url = baseURL + "/user/update/" + currentUserID + "/name=" + name
			+ "/email=" + email + "/password=" + password;
	let settings = {
		type : "PUT"
	};
	console.log("update url = " + url);
	$.ajax(url, settings);
	// let ol = document.getElementById("Users");
	// let items = ol.getElementsByTagName("li");
	// for (let i = 0; i < items.length; i++) {
	// if (items[i].classList[0] == "selected") {
	// items[i].forename = forename;
	// items[i].surname = surname;
	// items[i].dateOfBirth = dateOfBirth;
	// items[i].jobTitle = jobTitle;
	// }
	// }
	// clearUpdatedUserValues()
	// populateUsers()
}

// save an User using the User service, given its position
function saveUser() {

	let name = $("#registerName").val();
	let email = $("#registerEmail").val();
	let password = $("#registerPassword").val();
	let bankAccount = $("#bankAccount").val();

	let data = {
		"name" : name,
		"password" : password,
		"email" : email,
		"bankAccount" : bankAccount
	};

	let url = baseURL + "/user/add";

	console.log("name " + name);
	console.log("email " + email);
	console.log("password " + password);
	console.log("bankAccount " + bankAccount);

	if (name != null && email != null && password != null
			&& bankAccount != null) {
		console.log("Saving");

		$.post(url, data, function() {

			$().load("profile.html") // TODO load page profile.html!!!!
		});
		
		alert("User saved!");

	} else {
		alert("Not all fields are filled!")
	}
}

function logout() {
	// go to main page index.html;
	document.location.href = "http://localhost:8080/BBank/", true;

}
// retrieve all Users from User service and populate list

// function login(){
//
// console.log("inside login")
//	
// //TODO encrypt PASSWORD!!!!!!!!
// let email = $('#loginEmail').val();
// let password = $('#loginPassword').val();
// let url = baseURL + "/user/email=" + email + "/pws=" + password;
//	
// // use jQuery shorthand AJAX function to get JSON data
// $.getJSON(url, function(user) {
// console.log("inside login json")
// $("#name").val(user["name"]);
// $("#email").val(user["email"]);
// var transactions = user["transactions"];
// var transactionsName = user["transactionsName"]
// $("#savingAccount").val(user["savingAccount"]);
// $("#bankAccount").val(user["bankAccount"]);
// $("#cryptoAccount").val(user["cryptoAccount"]);
// var total = $("#savingAccount").val() + $("#bankAccount").val() +
// $("#cryptoAccount").val();
// $("#total").val(user[total]);
// //TODO redirect to profile page
// console.log("user stuff " + user["name"] + user["email"])
// });
// }

function login() {
	console.log("inside login")
	let email = $('#loginEmail').val();
	let password = $('#loginPassword').val();
	let url = baseURL + "/user/email=" + email + "/pws=" + password;
	let request = new XMLHttpRequest();
	request.open("GET", url, false);
	request.send();
	let response = request.response;
	let user = JSON.parse(response);
	currentUserID = user["id"];
	document.location.href = "http://localhost:8080/BBank/profile.html", true;

	let userId = user["id"];
	$("#name").val(user["name"]);
	$("#email").val(user["email"]);
	let transactions = user["transactions"];
	let transactionsName = user["transactionsName"]
	$("#savingAccount").val(user["savingAccount"]);
	$("#bankAccount").val(user["bankAccount"]);
	$("#cryptoAccount").val(user["cryptoAccount"]);
	// let total = $("#savingAccount").val() + $("#bankAccount").val() +
	// $("#cryptoAccount").val();
	$("#total").val(user["total"]);
	console.log("user stuff " + user["name"] + user["email"])

	currentUser = {
		id : userId,
		name : user["name"],
		email : user["email"],
		total : user["total"],
		savingsAccount : user["savingAccount"],
		cryptoAccount : user["cryptoAccount"],
		bankAccount : user["bankAccount"],
		transactions : transactions,
		transactionsName : transactionsName
	}

	localStorage.setItem("currentUser", JSON.stringify(currentUser));

}

function getUserData() {
	console.log("inside get user data")

	// let url = baseURL + "/user/userGet";
	// let settings = {
	// type:"GET"
	// };
	// $.getJSON(url, function(user){
	// console.log("success");
	// })
	// .success(function (user) {
	// let userId = user["id"];
	// $("#name").val(user["name"]);
	// $("#email").val(user["email"]);
	// let transactions = user["transactions"];
	// let transactionsName = user["transactionsName"]
	// $("#savingAccount").val(user["savingAccount"]);
	// $("#bankAccount").val(user["bankAccount"]);
	// $("#cryptoAccount").val(user["cryptoAccount"]);
	// //let total = $("#savingAccount").val() + $("#bankAccount").val() +
	// $("#cryptoAccount").val();
	// $("#total").val(user["total"]);
	// console.log("user stuff " + user["name"] + user["email"])
	//		
	// for(let i = 0; i < transactions.length; i++){
	// console.log(transactions[i] + " | " + transactionsName[i]);
	// }
	// });
	let user = JSON.parse(localStorage.currentUser);

	$("#welcomeName").val("Welcome , " + user["name"]);
	let transactions = user["transactions"];
	let transactionsName = user["transactionsName"];
	$("#savingAccount").val("&pound;" + user["savingAccount"]);
	$("#bankAccount").val("&pound;" + user["bankAccount"]);
	$("#cryptoWallet").val(user["cryptoAccount"] + " Bitcoin");
	// let total = $("#savingAccount").val() + $("#bankAccount").val() +
	// $("#cryptoAccount").val();
	$("#total").val("&pound;" + user["total"]);

	if (user["bankAccount"] == null)
		document.getElementById("bankAccount").innerHTML = "0";
	else
		document.getElementById("bankAccount").innerHTML = user["bankAccount"];

	if (user["savingAccount"] == null)
		document.getElementById("savingAccount").innerHTML = "0";
	else
		document.getElementById("savingAccount").innerHTML = user["savingAccount"];

	if (user["cryptoAccount"] == null)
		document.getElementById("cryptoWallet").innerHTML = "0";
	else
		document.getElementById("cryptoWallet").innerHTML = user["cryptoAccount"];

	if (user["total"] == null)
		document.getElementById("total").innerHTML = "0";
	else
		document.getElementById("total").innerHTML = user["total"];

	document.getElementById("welcomeName").innerHTML = "Welcome, "
			+ user["name"];

	// document.getElementById("transactionsTable").value =

	console.log("&pound;" + user["savingAccount"]);
	console.log(user["transactions"]);
	console.log("&pound;" + user["bankAccount"]);
	console.log(user["cryptoAccount"] + " Bitcoin");

	let table = document.getElementById("transactionsTable");

	for (let i = 0; i < transactions.length; i++) {
		let currentTransactionName;
		if (transactionsName == null)
			currentTransactionName = "undefined";
		else
			currentTransactionName = transactionsName[i];

		console.log(transactions[i] + " | " + currentTransactionName);
		let newRow = table.insertRow(0);
		let newCell = newRow.insertCell(0);
		let secondCell = newRow.insertCell(1);
		let thirdCell = newRow.insertCell(2);
		let newText = document.createTextNode(transactions[i]);
		let secondText = document.createTextNode(currentTransactionName);
		let thirdText = document.createTextNode("");
		newCell.appendChild(newText);
		secondCell.appendChild(secondText);
		thirdCell.appendChild(thirdText);
	}
}

//
// function getUserData(){
// console.log("inside get user data")
//
// let url = baseURL + "/userGet";
// let request = new XMLHttpRequest();
// request.open("GET", url, false);
// request.send();
// let settings = {
// type:"GET"
// };
// $.ajax(url, settings)
//	
// let response = request.response;
// let user = JSON.parse(response);
//	
// let userId = user["id"];
// $("#name").val(user["name"]);
// $("#email").val(user["email"]);
// let transactions = user["transactions"];
// let transactionsName = user["transactionsName"]
// $("#savingAccount").val(user["savingAccount"]);
// $("#bankAccount").val(user["bankAccount"]);
// $("#cryptoAccount").val(user["cryptoAccount"]);
// //let total = $("#savingAccount").val() + $("#bankAccount").val() +
// $("#cryptoAccount").val();
// $("#total").val(user["total"]);
// console.log("user stuff " + user["name"] + user["email"])
//	
// for(let i = 0; i < transactions.length; i++){
// console.log(transactions[i] + " | " + transactionsName[i]);
// }
// }

function asd(user) {

}

function transferMoney() {
	console.log("inside transfer money")
	let email = $("#transferEmail").val();
	let bankAccount = $("#bankNumber").val();
	let crypto = $("#cryptoNumber").val();

	let bankAccountCurrent = $("#bankAccount").val();
	let total = $("total").val();
	let cryptoWallet = $("cryptoWallet").val();
	
	let user = JSON.parse(localStorage.currentUser);


	// if (bankAccount > bankAccountCurrent)
	// bankAccount = bankAccountCurrent;
	// if (bankAccount < 0)
	// bankAccount = 0;
	//
	// if (crypto > cryptoWallet)
	// crypto = cryptoWallet;
	// if (crypto < 0)
	// crypto = 0;

	let url = baseURL + "/user/transfer/email=" + email + "/money="
			+ bankAccount + "/crypto=" + crypto + "/from=" + user["email"];

	let dataSend = {
		"email" : name,
		"bankAccount" : bankAccount,
		"crypto" : crypto
	};

	console.log("update url = " + url);
	$.ajax({
		type : 'PUT',
		url : url,
		data : dataSend
	}).done(function() {
		console.log("Success! Transferred!");

		let newTotal = total - (bankAccount + (crypto * BitcoinPrice));
		let newCryptoTotal = cryptoWallet - crypto;
		let newBankAccount = bankAccountCurrent - bankAccount;

		document.getElementById("total").innerHTML = newTotal;
		document.getElementById("cryptoWallet").innerHTML = newCryptoTotal;
		document.getElementById("bankAccount").innerHTML = newBankAccount;
		// document.getElementById('transactionsTable').value =

	}).fail(function(msg) {
		console.log("Fail");
	})

}

function populateUsers() {

	let url = baseURL + "/user/search";

	console.log("URL ::" + url);
	// use jQuery shorthand AJAX function to get JSON data
	$.getJSON(url, function(Users) {
		// $("#Users").empty(); // find User list and remove its children
		let currentForename = $("#searchName").val();
		console.log("in Users get json " + url);
		for ( var i in Users) {
			let User = Users[i]; // get 1 User from the
			let id = User["id"];
			let forename = User["forename"];
			let surname = User["surname"];
			let dateOfBirth = User["dateOfBirth"];
			let jobTitle = User["jobTitle"];
			let qualificationTitle = User["qualificationTitle"];
			let dateCompleted = User["dateCompleted"];
			let expiryDate = User["expiryDate"];

			let lotsOfTabs = "&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;" // &nbsp;
			// &nbsp;
			// &nbsp;
			// &nbsp;
			// &nbsp;
			// compose HTML of a list item using the User variables.
			let htmlCode = "<li id =" + id + ">" + forename + lotsOfTabs
					+ lotsOfTabs + surname + lotsOfTabs + lotsOfTabs
					+ dateOfBirth + lotsOfTabs + lotsOfTabs + jobTitle
					+ lotsOfTabs + lotsOfTabs + qualificationTitle + lotsOfTabs
					+ lotsOfTabs + dateCompleted + lotsOfTabs + lotsOfTabs
					+ expiryDate + lotsOfTabs + "</li><br>";

			$("#Users").append(htmlCode);
		}

		// function productsAdd() {
		// $("#productTable tbody").append(
		// "<tr>" +
		// "<td>My First Video</td>" +
		// "<td>6/11/2015</td>" +
		// "<td>www.pluralsight.com</td>" +
		// "</tr>"
		// );
		// }

		// look for all list items (i.e. Users), set their click handler
		$("#Users li").click(function() {
			console.log("id is " + $(this).attr("id"));
			UserClick($(this).attr("id"));
			selectedID = $(this).attr("id");
		});
	});
}
