
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
    users.push(userObject);
    location.href = "index.html";

}

