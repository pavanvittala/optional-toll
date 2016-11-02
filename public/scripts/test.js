firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var uid = user.uid;
        userName = user.uid;
        var GMU = {place: "GMU",  street: "4400 University Dr", cityState: "Fairfax, VA", country: "United States of America", zipCode:  "22030"};
        var providerData = user.providerData;
        user.getToken().then(function(accessToken) {
             document.getElementById('sign-in-status').textContent = "Welcome, " + displayName;
             document.getElementById('account-details').textContent = JSON.stringify({
             displayName: displayName,
             email: email,
             emailVerified: emailVerified,
             photoURL: photoURL,
             uid: uid,
             accessToken: accessToken,
             providerData: providerData
             }, null, '  ');
        });
        /*
        users.once('value', function(dataSnapshot) {
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
        */
    } else {
        // User is signed out.
        // FirebaseUI config.
        var uiConfig = {
            'signInSuccessUrl': '/', //URL that we get sent BACK to after logging in
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
    console.log(error);
};
