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
var users = firebase.database().ref('users');

$(document).ready(function() {
    $("#submit").click(function() {
        var submitButton = document.getElementById("submit");
        var rememberCheckBox = document.getElementById("remember");
        var email = document.getElementById("inputEmail").value;
        var passwd = document.getElementById("inputPassword").value;
        loginUser(email, passwd, rememberCheckBox);
    });
});

function loginUser(email, pwd, checkbox) {
    var strip = stripEmail(email);
    var url = config.databaseURL + "/users/" + strip + "/user.json";
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);
    xhttp.send();
    var retname = xhttp.responseText;
    var userObject = JSON.parse(retname);
    if (retname != null) {  //That account exists in the database, verify credentials
        //console.log("Input: "+pwd);
        //console.log("JSON_PWD: "+ userObject.password);
        if (userObject.password === pwd) {  //Check if the password they entered is correct
            if (checkbox.checked == true) {
                setCookie(email, true);
            } else {
                setCookie(email, false);
            }
        } else {
            alert("Wrong Password! Try again");
        }
    } else {    //Account does not exist in the database
        alert("You need to create an account. You will now be redirected to the create account page");
        window.location.href = "dataEntry.html";
    }
}

function setCookie(email, remember) {
    if (readCookie("email") == null) {
        if (remember == true) {
            var days = 7;
            createCookie("email", email, days);
        } else {
            createCookie("email", email, 0);    //Remember user until browser is closed
        }
    } else {
        alert(email + " is already logged in");
    }
}
