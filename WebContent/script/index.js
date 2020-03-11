
var modal = document.getElementById('id01');
var registerModal = document.getElementById('id02');

window.onclick = function(event) { // When the user clicks anywhere outside of the modal, close it
    if (event.target == modal) {
        modal.style.display = "none";
    }
    if (event.target == registerModal) {
        registerModal.style.display = "none";
    }
}


let baseURL = "api"; 

try {
	$(function() {
		init();
	});
} catch (e) {
	alert("*** jQuery not loaded. ***");
}

populateEmployees() // display all employees

$(function() {
	$('input[name="singlerange"]').daterangepicker({
		singleDatePicker : true,
		showDropdowns : true,
		minYear : 1901,
		maxYear : parseInt(moment().format('YYYY'), 10)
	}, function(start, end, label) {
		singleDate = start.format('MM-DD-YYYY');
	});
});

$(function() {
	$("#employeeDetailsDialog").dialog({
		modal : true, // modal dialog to disable parent when dialog is active
		autoOpen : false, // set autoOpen to false, hiding dialog after
		title : "Employee Details",
		minWidth : 250,
		minHeight : 200
	});
	$("#openDialog").click(function() {
		$("#forename").val("");
		$("#surname").val(""); // clear city name text input
		$("#dateOfBirth").val("");
		$("#jobTitle").val("");
		$("#qualificationTitle").val("");
		$("#dateCompleted").val(""); // clear employee name text input
		$("#dateExpiry").val(""); // clear employee name text input
		$("#employeeDetailsDialog").dialog('open'); // open dialog box
	});
});

function init() {

	$("#refreshButton").click(function() {
		populateEmployees();
	});

	$("#updateEmployee").click(
			function() {
				$("#Employees li .selected").each(
						function() {
							console.log("Update Employee IN");
							updateEmployee($(this).attr("id"), 
									$(this).attr("forename"),
									$(this).attr("surname"),
									$(this).attr("dateOfBirth"),
									$(this).attr("jobTitle"));

						});
			});
}

function cancelEmployee() {
	$("#employeeDetailsDialog").dialog("close");
}

function cancelEmployeeFunc() {
	$("#updateDeleteDialog").dialog("close");
}

$(function() {
	$("#updateDeleteDialog").dialog({
		modal : true, // modal dialog to disable parent when dialog is active
		autoOpen : false, // set autoOpen to false, hiding dialog after
		title : "Employee Details",
		minWidth : 250,
		minHeight : 200
	});
	$("#employees").click(function() {
		$("#updateDeleteDialog").dialog('open'); // open dialog box
		retrieveOneEmployee()
	});
});

function onClickDelete() {
	let ol = document.getElementById("employees")
	let items = ol.getElementsByTagName("li");
	for (let i = 0; i < items.length; i++) {
		if (items[i].classList[0] == "selected") {
			deleteEmployee(items[i].id);
			console.log("in the delete click")
		}
	}
}

function onClickUpdate() {
	let ol = document.getElementById("employees")
	let items = ol.getElementsByTagName("li");
	for (let i = 0; i < items.length; i++) {
		if (items[i].classList[0] == "selected") {
			updateEmployee(items[i].id);
			console.log("in the update click")
		}
	}
}

function employeeClick(id) {
	$("#employees li").removeClass("selected");
	$("#" + id).addClass("selected");
}

function deleteEmployee(id) {
	console.log("in the delete method")

	let url = baseURL + "/employee/delete/" + id;
	let settings = {
		type : "DELETE"
	};
	$.ajax(url, settings);
	$("#updateDeleteDialog").dialog("close");

}

function clearSaveEmployeeValues() {
	$("#dateOfBirth").val("");
	$("#surname").val("");
	$("#forename").val("");
	$("#jobTitle").val("");
	$("#qualificationTitle").val("");
	$("#dateCompleted").val("");
	$("#expiryDate").val("");
}

function clearUpdatedEmployeeValues() {
	$("#newDateOfBirth").val("");
	$("#newSurname").val("");
	$("#newForename").val("");
	$("#newJobTitle").val("");
	$("#newQualificationTitle").val("");
	$("#newDateCompleted").val("");
	$("#newExpiryDate").val("");
}

// save an Employee using the Employee service, given its position
function updateEmployee(id) {
	let forename = $("#newForename").val();
	let surname = $("#newSurname").val();
	let dateOfBirth = $("#newDateOfBirth").val().split("/").join("-");
	let jobTitle = $("#newJobTitle").val();
	// let qualificationTitle = $("#qualificationTitle").val();
	// let dateCompleted = $("#dateCompleted").val().split("/").join("-");
	// let expiryDate = $("#expiryDate").val().split("/").join("-");
	// let qualification = new Qualification(qualificationTitle, dateCompleted,
	// expiryDate);

	let url = baseURL + "/employee/update/" + id + "/forename=" + forename
			+ "/surname=" + surname + "/dateOfBirth=" + dateOfBirth + "/jobTitle="
			+ jobTitle;// + "/qualification=" + qualification;
	let settings = {
		type : "PUT"
	};
	console.log("update url = " + url);

	$.ajax(url, settings);

	let ol = document.getElementById("employees");
	let items = ol.getElementsByTagName("li");
	for (let i = 0; i < items.length; i++) {
		if (items[i].classList[0] == "selected") {
			items[i].forename = forename;
			items[i].surname = surname;
			items[i].dateOfBirth = dateOfBirth;
			items[i].jobTitle = jobTitle;
		}
	}
	clearUpdatedEmployeeValues()
	$("#updateDeleteDialog").dialog("close");
	populateEmployees()
}

// save an Employee using the Employee service, given its position
function saveEmployee() {

	let forename = $("#forename").val(); 
	let surname = $("#surname").val();
	let dateOfBirth = $("#dateOfBirth").val();
	let jobTitle = $("#jobTitle").val();
	//let qualificationTitle = $("#qualificationTitle").val();
	//let dateCompleted = $("#dateCompleted").val();
	//let expiryDate = $("#expiryDate").val();
	let data = {
		"forename" : forename,
		"surname" : surname,
		"dateOfBirth" : dateOfBirth,
		"jobTitle" : jobTitle//,
		//"qualificationTitle" : qualificationTitle,
		//"dateCompleted" : dateCompleted,
		//"expiryDate" : expiryDate
	};

	let url = baseURL + "/employee/add";
	
	console.log("Saving");
	
	$.post(url, data, function() {
		alert("Employee saved!");
		
		clearSaveEmployeeValues();
		cancelEmployeeFunc();
		populateEmployees();
	});

}

// retrieve all Employees from Employee service and populate list

function retrieveOneEmployee() {
	let url = baseURL + "/employee/get=" + selectedID;

	console.log("URL is: " + url);
	// use jQuery shorthand AJAX function to get JSON data
	$.getJSON(url, function(employee) {
		$("#newforename").val(employee["forename"]);
		$("#newSurname").val(employee["surname"]);
		$("#newDateOfBirth").val(employee["dateOfBirth"]);
		$("#newJobTitle").val(employee["jobTitle"]);
		$("#newQualificationTitle").val(employee["qualificationTitle"]);
		$("#newDateCompleted").val(employee["dateCompleted"]);
		$("#newExpiryDate").val(employee["expiryDate"]);
		document.getElementById("newForename").value = employee["forename"];
		console.log("new " + $("#newforename").val());
	});
}

function populateEmployees() {

	let url = baseURL + "/employee/search";

	console.log("URL ::" + url);
	// use jQuery shorthand AJAX function to get JSON data
	$.getJSON(url, function(employees) {
		$("#employees").empty(); // find Employee list and remove its
		// children
		let currentForename = $("#searchName").val();
		console.log("in Employees get json " + url);
		
		for ( var i in employees) {
			let employee = employees[i]; // get 1 Employee from the
			let id = employee["id"];
			let forename = employee["forename"];
			let surname = employee["surname"];
			let dateOfBirth = employee["dateOfBirth"];
			let jobTitle = employee["jobTitle"];
			let qualificationTitle = employee["qualificationTitle"];
			let dateCompleted = employee["dateCompleted"];
			let expiryDate = employee["expiryDate"];
			
			let lotsOfTabs = "&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;" // &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
			// compose HTML of a list item using the Employee variables.
			let htmlCode = "<li id =" + id + ">" + forename + lotsOfTabs + 
					lotsOfTabs + surname + lotsOfTabs + 
					lotsOfTabs + dateOfBirth + lotsOfTabs +
					lotsOfTabs + jobTitle + lotsOfTabs +
					lotsOfTabs + qualificationTitle+ lotsOfTabs +
					lotsOfTabs + dateCompleted + lotsOfTabs +
					lotsOfTabs + expiryDate + lotsOfTabs + "</li><br>";

			$("#employees").append(htmlCode);
		}

		// look for all list items (i.e. Employees), set their click handler
		$("#employees li").click(function() {
			console.log("id is " + $(this).attr("id"));
			employeeClick($(this).attr("id"));
			selectedID = $(this).attr("id");
		});
	});
}
