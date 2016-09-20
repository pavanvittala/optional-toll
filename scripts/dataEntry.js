
$(document).ready(function() {
    $("#submit-data").click(function(){
        var panel = document.getElementById("inputPanel");
        var firstName = document.getElementById("first-name");
        var lastName = document.getElementById("last-name");
        var email = document.getElementById("email-address");
        var passwd = document.getElementById("ps");
        var confirmPasswd = document.getElementById("confirm-ps");
            
        var reference = ["First Name: ", "Last Name: ", "Email: ", "Password: ", "Confirm Password: "];
        var inputData;
        if (firstName.value != "" && lastName.value != "" && email.value != "" && passwd.value != "" && confirmPasswd.value != "") {
            inputData = [firstName.value, lastName.value, email.value, passwd.value, confirmPasswd.value];
            inputValidationView(reference, inputData);
        } else {
            window.alert("Please fill in all the text boxes");
        }
    });
});

function inputValidationView(reference, listOfData) {
    var panel = document.getElementById("inputPanel");
    var body = document.body;
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
    history.pushState({"state1":1, "data":panel.innerHTML}, "dataView", "?view=dataView");
    history.pushState({"state2":2, "data":panel.innerHTML}, "dataView", "?view=dataView");
    panel.removeChild(input);
    table.marginTop = "100px";
    table.marginBottom = "100px";
    table.marginLeft = "100px";
    table.marginRight = "100px";
    table.style.padding = "3px";
    table.style.fontWeight = "none";
    var title = document.createElement("h2");
    title.appendChild(document.createTextNode("Your Information: "));
    panel.appendChild(title);
    panel.appendChild(table);
    window.alert("This feature is not yet complete... Check back soon! But here's your information for you!");
}

//dataInputValidationPanelView
window.addEventListener('popstate', function(event) {
    event.preventDefault();
    var state = event.state;
    var panel = document.getElementById("inputPanel");
    panel.innerHTML = state.data;
});
