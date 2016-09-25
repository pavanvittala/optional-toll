function escapeEmail(email) {
    return email.replace('.', ',');
}

function unescapeEmail(email) {
    return email.replace(',', '.');
}

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
            addUser(inputData);
        } else {
            window.alert("Please fill in all the text boxes");
        }
    });
});

//Add a user to the database
function addUser(listOfData) {
    //Create a userObject
    var userObject = {
        "First Name": listOfData[0],
        "Last Name": listOfData[1],
        "Email": listOfData[2],
        "Password": listOfData[3]
    };
    var GMU = {place: "GMU",  street: "4400 University Dr", cityState: "Fairfax, VA", country: "United States of America", zipCode:  "22030"};
    var users = firebase.database().ref("users");   //Reference to users
    users.once('value', function(dataSnapshot) {
        if (dataSnapshot.hasChild(escapeEmail(listOfData[2]))) {    //Only add data to the database if the database doesn't contain that email
            alert("That email is already associated with an account");
        } else {    //Email is not in database
            users.child(escapeEmail(listOfData[2])).set({
                firstname: listOfData[0],
                lastname: listOfData[1],
                password: listOfData[3],
                savedLocations: [GMU]
            });
        }
    });
}
