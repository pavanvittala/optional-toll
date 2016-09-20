//Pavan Vittala
//Scripts for dataEntry.html

//Function for submitting data to be organized into a table
$(document).ready(function() {
    $("#submit-data").click(function(){
        //get panel and input boxes
        var panel = document.getElementById("inputPanel");
        var firstName = document.getElementById("first-name");
        var lastName = document.getElementById("last-name");
        var email = document.getElementById("email-address");
        var passwd = document.getElementById("ps");
        var confirmPasswd = document.getElementById("confirm-ps");
            
        //Create a reference array, used later to create table
        var reference = ["First Name: ", "Last Name: ", "Email: ", "Password: ", "Confirm Password: "];
        var inputData;
        if (firstName.value != "" && lastName.value != "" && email.value != "" && passwd.value != "" && confirmPasswd.value != "") {    //All input boxes must have text in them
            inputData = [firstName.value, lastName.value, email.value, passwd.value, confirmPasswd.value];
            inputValidationView(reference, inputData);
        } else {    //Alert user to fill in all text boxes.
            window.alert("Please fill in all the text boxes");
        }
    });
});

//Generates table from user input
function inputValidationView(reference, listOfData) {
    var panel = document.getElementById("inputPanel");
    var body = document.body;
    var table = document.createElement("table");
    table.style.border = "1px solid black";
    for (var i = 0; i<5; i++) { //Create 5 rows
        var row = table.insertRow();
        for (var j = 0; j<2; j++) { //Create "Placeholder cells"
            var col = row.insertCell();
            if (j == 0) {
                col.appendChild(document.createTextNode(reference[i]));   
            } else {
                col.appendChild(document.createTextNode(listOfData[i]));   
            }
            col.style.border = "1px solid black";
        }
    }
    var input = document.getElementById("input");
    //Next two lines are used to store history state
    history.pushState({"state1":1, "data":panel.innerHTML}, "dataView", "?view=dataView");
    history.pushState({"state2":2, "data":panel.innerHTML}, "dataView", "?view=dataView");
    //Remove the data in the old panel
    panel.removeChild(input);
    table.marginTop = "100px";
    table.marginBottom = "100px";
    table.marginLeft = "100px";
    table.marginRight = "100px";
    table.style.padding = "3px";
    table.style.fontWeight = "none";
    var title = document.createElement("h2");
    title.appendChild(document.createTextNode("Your Information: "));
    //Add new information to the panel
    panel.appendChild(title);
    panel.appendChild(table);
    //Let the user know this feature is yet to come!
    window.alert("This feature is not yet complete... Check back soon! But here's your information for you!");
}

//dataInputValidationPanelView, used when user hits back or forward button
window.addEventListener('popstate', function(event) {
    event.preventDefault();
    var state = event.state;
    var panel = document.getElementById("inputPanel");
    panel.innerHTML = state.data;
});
