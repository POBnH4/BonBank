
let baseURL = "api"; 
var modal = document.getElementById('id01');
var registerModal = document.getElementById('id02');
var transferModal = document.getElementById('id03');

var currentUserID = "";

window.onclick = function(event) { // When the user clicks anywhere outside of the modal, close it
    if (event.target == modal) {
        modal.style.display = "none";
    }
    if (event.target == registerModal) {
        registerModal.style.display = "none";
    }
    if(event.target == transferModal){
    	transferModal.style.display = "none";
    }
}

try {
	$(function() {
		init();
	});
} catch (e) {
	alert("*** jQuery not loaded. ***");
}

//populateUsers() // display all Users

//$("#loginForm").submit(function(event) {
//
//	  //TODO encrypt PASSWORD!!!!!!!!
//	  let email = $('#loginEmail').val();
//	  let password = $('#loginPassword').val();
//
//	  let url = baseURL + "/user/email=" + email + "/pws=" + password;
//	  /* stop form from submitting normally */
//	  event.preventDefault();
//
//	  window.location.href = 'https://w3docs.com';
//	  
//	  // use jQuery shorthand AJAX function to get JSON data
//	  var sending = $.getJSON(url, function(user) {
//			console.log("inside login json")
//			window.location.href = "http://localhost:8080/BBank/pages/profile.html"; // TODO MIGHT HAVE TO UPDATE IN AWS
//			$("#name").val(user["name"]);
//			$("#email").val(user["email"]);
//			var transactions = user["transactions"];
//			var transactionsName = user["transactionsName"]
//			$("#savingAccount").val(user["savingAccount"]);
//			$("#bankAccount").val(user["bankAccount"]);
//			$("#cryptoAccount").val(user["cryptoAccount"]);
//			var total = $("#savingAccount").val() + $("#bankAccount").val() + $("#cryptoAccount").val();
//			$("#total").val(user[total]);
//			//document.getElementById("newForename").value = user["forename"];
//			//console.log("new " + $("#newforename").val());
//			//TODO redirect to profile page
//		});
//
//	  /* Alerts the results */
//	  sending.done(function( data ) {
//	    alert('success');
//	  });
//});



function init() {

	$("#refreshButton").click(function() {
		populateUsers();
	});

	$("#updateUser").click(
			function() {
				$("#Users li .selected").each(
						function() {
							console.log("Update User IN");
							updateUser($(this).attr("id"), 
									$(this).attr("forename"),
									$(this).attr("surname"),
									$(this).attr("dateOfBirth"),
									$(this).attr("jobTitle"));

						});
			});
}

function cancelUser() {
	$("#UserDetailsDialog").dialog("close");
}

function cancelUserFunc() {
	$("#updateDeleteDialog").dialog("close");
}


function deleteUser() {
	for (let i = 0; i < items.length; i++) {
		if (items[i].classList[0] == "selected") {
			deleteUser(items[i].id);
			console.log("in the delete click")
		}
	}
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


function deleteUser(id) {
	console.log("in the delete method")

	let url = baseURL + "/user/delete/" + currentUserID;
	let settings = {
		type : "DELETE"
	};
	$.ajax(url, settings);

	//redirect to homepage;
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
//	let ol = document.getElementById("Users");
//	let items = ol.getElementsByTagName("li");
//	for (let i = 0; i < items.length; i++) {
//		if (items[i].classList[0] == "selected") {
//			items[i].forename = forename;
//			items[i].surname = surname;
//			items[i].dateOfBirth = dateOfBirth;
//			items[i].jobTitle = jobTitle;
//		}
//	}
	//clearUpdatedUserValues()
	//populateUsers()
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
	alert("SAVED");

	let url = baseURL + "/user/add";
	
	console.log("Saving");
	
	$.post(url, data, function() {
		alert("User saved!");
		
		$().load("pages/profile.html") // TODO load page profile.html!!!!
	});
}


function logout(){
	// go to main page index.html;
}
// retrieve all Users from User service and populate list

function login(){

	console.log("inside login")
	
	//TODO encrypt PASSWORD!!!!!!!!
	let email = $('#loginEmail').val();
	let password = $('#loginPassword').val();
	let url = baseURL + "/user/email=" + email + "/pws=" + password;
	
	// use jQuery shorthand AJAX function to get JSON data
	$.getJSON(url, function(user) {
		console.log("inside login json")
		$("#name").val(user["name"]);
		$("#email").val(user["email"]);
		var transactions = user["transactions"];
		var transactionsName = user["transactionsName"]
		$("#savingAccount").val(user["savingAccount"]);
		$("#bankAccount").val(user["bankAccount"]);
		$("#cryptoAccount").val(user["cryptoAccount"]);
		var total = $("#savingAccount").val() + $("#bankAccount").val() + $("#cryptoAccount").val();
		$("#total").val(user[total]);
		//TODO redirect to profile page
		console.log("user stuff " + user["name"] + user["email"])
	}).done(function() {
	    console.log("second success");
	  })
	  .fail(function(e) {
	    console.log("error");
	  })
	  .always(function() {
	    console.log("complete");
	  });
}
function transferMoney(){
	let email = $("#transferEmail").val();
	let bankAccount = $("#bankNumber").val();
	let crypto = $("#cryptoNumber").val();

	let url = baseURL + "/user/transfer/email=" + email 
					  + "/money=" + bankAccount 
					  + "/crypto=" + crypto;
	let settings = {
		type : "PUT"
	};
	console.log("update url = " + url);
	$.ajax(url, settings);

}


function populateUsers() {

	let url = baseURL + "/user/search";

	console.log("URL ::" + url);
	// use jQuery shorthand AJAX function to get JSON data
	$.getJSON(url, function(Users) {
		//$("#Users").empty(); // find User list and remove its children
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
			
			let lotsOfTabs = "&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;" // &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
			// compose HTML of a list item using the User variables.
			let htmlCode = "<li id =" + id + ">" + forename + lotsOfTabs + 
					lotsOfTabs + surname + lotsOfTabs + 
					lotsOfTabs + dateOfBirth + lotsOfTabs +
					lotsOfTabs + jobTitle + lotsOfTabs +
					lotsOfTabs + qualificationTitle+ lotsOfTabs +
					lotsOfTabs + dateCompleted + lotsOfTabs +
					lotsOfTabs + expiryDate + lotsOfTabs + "</li><br>";

			$("#Users").append(htmlCode);
		}
		
		
//		function productsAdd() {
//			  $("#productTable tbody").append(
//			      "<tr>" +
//			        "<td>My First Video</td>" +
//			        "<td>6/11/2015</td>" +
//			        "<td>www.pluralsight.com</td>" +
//			      "</tr>"
//			  );
//			}

		// look for all list items (i.e. Users), set their click handler
		$("#Users li").click(function() {
			console.log("id is " + $(this).attr("id"));
			UserClick($(this).attr("id"));
			selectedID = $(this).attr("id");
		});
	});
}
