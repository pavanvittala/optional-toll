// Initialize Firebase
"use strict";
var config = {
    apiKey: "AIzaSyAjbetBiCaHcNJbiWd3eBywO1jYufYVVxI",
    authDomain: "optio-toll.firebaseapp.com",
    databaseURL: "https://optio-toll.firebaseio.com",
    storageBucket: "optio-toll.appspot.com",
    messagingSenderId: "163118324324"
};
firebase.initializeApp(config);
//Our key is an email address. The path for children in Firebase cannot contain periods. So remove these
function stripEmail(email) {
    return email.replace('.', ',');
}

function deStripEmail(email) {
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
        if (dataSnapshot.hasChild(stripEmail(listOfData[2]))) {    //Only add data to the database if the database doesn't contain that email
            alert("That email is already associated with an account");
        } else {    //Email is not in database
            //Create a child whose key is stripEmail(listOfData[2]) and set its data as follows:
            firebase.database().ref('users/'+stripEmail(listOfData[2])).set({user:{
                firstname: listOfData[0],
                lastname: listOfData[1],
                password: listOfData[3],
                savedLocations: [GMU]
            }});
            /*
            firebase.database().ref('users/'+stripEmail(listOfData[2])).set({
                firstname: listOfData[0],
                lastname: listOfData[1],
                password: listOfData[3],
                savedLocations: [GMU]
            });
            users.child(stripEmail(listOfData[2])).set({
                email: listOfData[2],
                firstname: listOfData[0],
                lastname: listOfData[1],
                password: listOfData[3],
                savedLocations: [GMU]
            });
            */
        }
    });

    firebase.database().ref('users/'+stripEmail(listOfData[2])).once('value').then(function(snapShot) {
        var username = snapShot.val();
        console.log("firstname: "+username.firstname, "lastname: "+username.lastname, "password: "+ username.password);
    });
}
