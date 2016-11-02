// Initialize Firebase

"use strict";
var GoogleUsers = firebase.database().ref('GoogleUsers');

var userName;
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        $('#sign-in-header span').text('Logged In');
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var uid = user.uid;
        userName = user.uid;
        var GMU = {place: "GMU",  street: "4400 University Dr", cityState: "Fairfax, VA", country: "United States of America", zipCode:  "22030"};
        var providerData = user.providerData;
        user.getToken().then(function(accessToken) {
            GoogleUsers.once('value', function(dataSnapshot) {
                if (dataSnapshot.hasChild(uid)) {    //Only add data to the database if the database doesn't contain that email
                    console.log("User Already in Firebase");
                } else {    //Email is not in database
                    firebase.database().ref('GoogleUsers/'+uid).set({user:{
                        name: displayName,
                        email: email,
                        savedLocations: [GMU]
                    }});
                    console.log("User Created In Firebase ref GoogleUsers");
                }
            });
        });
    } else {
        // User is signed out.
        // FirebaseUI config.
        var uiConfig = {
            'signInSuccessUrl': '/login.html', //URL that we get sent BACK to after logging in
            'signInOptions': [firebase.auth.GoogleAuthProvider.PROVIDER_ID,],
            'tosUrl': '<your-tos-url>', // Terms of service url.
        };

        //Initialize the FirebaseUI Widget using Firebase.
        var ui = new firebaseui.auth.AuthUI(firebase.auth());
        // The start method will wait until the DOM is loaded.
        ui.start('#firebaseui', uiConfig);
        console.log("Started UI For Logging In With Google");
    }
}), function(error) {
    console.log("Printing an error now");
    console.log(error);
};

function loginUser(email, pwd, checkbox) {
    var strip = stripEmail(email);
    var url = config.databaseURL + "/users/" + strip + "/user.json";
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);
    xhttp.send();
    var retname = xhttp.responseText;
    var userObject = JSON.parse(retname);
    if (retname != null) {  //That account exists in the database, verify credentials
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
