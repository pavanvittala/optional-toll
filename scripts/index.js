
/**
 * Created by Ken on 9/19/2016.
 */
function welcomeUser(){
    //var welcome = document.createTextNode("Welcome ");
    //var welcome = document.getElementById("loginmessage");
    //var nameinput = document.createElement("name");
    //var name = document.createTextNode(username);
    //document.getElementById("loginmessage").appendChild(name);

    var welcomeDiv = document.getElementById("loginmessage");
    
}


$(document).ready(function(){
    $("#submitButton").click(function(){
        var welcomeDiv = document.getElementById("loginMessage");
        welcomeDiv.value = "Welcome fuckers";
        welcomeDiv.style.color = "white";
        /*
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
        */
    });
});