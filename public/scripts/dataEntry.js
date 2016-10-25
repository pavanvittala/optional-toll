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

            $.post("/addUser", {data: listOfData, GMU: GMU});

            /*
            firebase.database().ref('users/'+stripEmail(listOfData[2])).set({user:{
                firstname: listOfData[0],
                lastname: listOfData[1],
                password: listOfData[3],
                savedLocations: [GMU]
            }});
            */
        }
    });
}
