
$(document).ready(function(){
    $("#submit-data").click(function(){
        var firstName = document.getElementById("first-name");
        var lastName = document.getElementById("last-name");
        var email = document.getElementById("email-address");
        var passwd = document.getElementById("ps");
        var confirmPasswd = document.getElementById("confirm-ps");

        var inputData;
        if (firstName.value != "" && lastName.value != "" && email.value != "" && passwd.value != "" && confirmPasswd.value != "") {
            if (passwd.value != confirmPasswd.value) {
                window.alert("Passwords don't match");
            }
            inputData = [firstName.value, lastName.value, email.value, passwd.value];
            inputValidationView(inputData);
        } else {
            window.alert("Please fill in all the text boxes");
        }
    });
});

function inputValidationView(listOfData) {
    var panel = document.getElementById("inputPanel");
    var body = document.body;
    var userObject = {"First Name":listOfData[0], "Last Name":listOfData[1], "Email":listOfData[2], "Password":listOfData[3]};
    var users = firebase.database().ref("users");
    //1. Add info to database, if not already in there
    //users.push(userObject);
    
    //2. Redirect to home page
    //location.href = "index.html";

    //history.pushState(panel.innerHTML, "RevertingView");
    /*
    var table = document.createElement("table");
    table.style.border = "1px solid black";
    for (var i = 0; i<5; i++) {
        var row = table.insertRow();
        for (var j = 0; j<2; j++) {
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
    panel.removeChild(input);
    table.marginTop = "25px";
    table.marginBottom = "100px";
    table.marginLeft = "100px";
    table.marginRight = "100px";
    table.style.padding = "3px";
    table.style.fontWeight = "none";
    var title = document.createElement("h2");
    title.appendChild(document.createTextNode("Your Information: "));
    panel.appendChild(title);
    panel.appendChild(table);
    window.alert("This feature is not yet complete... Check back soon!");
    */
}

/*
//dataInputValidationPanelView
window.addEventListener('popstate', function(event) {
    var state = event.state; 
    console.log(state);
    //document.getElementById("inputPanel") = state;
    
});
*/
