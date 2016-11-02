//Holds view information for account.html

"use strict";
var AccountPanel = React.createClass({
    getInitialState: function() {
        return {
            userLoggedIn: false
        }
    },

    propTypes: {
        title: React.PropTypes.string,
    },

    getDefaultProps: function () {
        return {
            title: "Account Information",
        }
    },

    render: function() {
        return (
            <div>
                <div className="panel panel-primary" id="account_panel">
                    <div className="panel-heading">
                        <h3 className="panel-title">{this.props.title}</h3>
                    </div>
                    <div className="panel-body">
                        <UserDataTable userLoggedIn={this.state.userLoggedIn}/>
                    </div>
                </div>
            </div>
        );
    }
});

var UserDataTable = React.createClass({
    propTypes: {
        firstname: React.PropTypes.string,
        lastname: React.PropTypes.string,
        email: React.PropTypes.string,
        savedLocations: React.PropTypes.array
    },

    getDefaultProps: function() {
        firstname: ""
        lastname: ""
        email: ""
        savedLocations: []
    },

    render: function() {
        return(
            <div>
                <ul className="list-group">
                    <li className="list-group-item" id="list_email">{this.props.email}</li>
                    <li className="list-group-item" id="list_firstname">{this.props.firstname}</li>
                    <li className="list-group-item" id="list_lastname">{this.props.lastname}</li>
                    <li className="list-group-item" id="list_savedLoc">{this.props.savedLocations}</li>
                </ul>
                <input onClick = {this.loadData} type="submit" value="Update Information" id="update_button"></input>            
            </div>
        );
    },

    loadData: function() {
        var email = document.getElementById('list_email');
        var first_name = document.getElementById('list_firstname');
        var last_name = document.getElementById('list_lastname');
        var saved_loc = document.getElementById('list_savedLoc');
        var updateButton = document.getElementById('update_button');
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                const databaseURL = "https://optio-toll.firebaseio.com";
                var url = databaseURL + "/users/" + stripEmail(exists) + "/user.json";
                var xhttp = new XMLHttpRequest();
                xhttp.open("GET", url, false);
                xhttp.send();
                var retname = xhttp.responseText;
                var userObject = JSON.parse(retname);
            } else {
                // No user is signed in.
                email.appendChild(document.createTextNode("Email: Not Logged In"));
                first_name.appendChild(document.createTextNode("First Name: -"));
                last_name.appendChild(document.createTextNode("Last Name: -"));
                saved_loc.appendChild(document.createTextNode("Saved Locations: -"));
                updateButton.disabled = true;
            }
        });

        /*
        var exists = readCookie('email');
        var email = document.getElementById('list_email');
        var first_name = document.getElementById('list_firstname');
        var last_name = document.getElementById('list_lastname');
        var saved_loc = document.getElementById('list_savedLoc');
        var updateButton = document.getElementById('update_button');
        if (exists == null) {
            email.appendChild(document.createTextNode("Email: Not Logged In"));
            first_name.appendChild(document.createTextNode("First Name: -"));
            last_name.appendChild(document.createTextNode("Last Name: -"));
            saved_loc.appendChild(document.createTextNode("Saved Locations: -"));
            updateButton.disabled = true;
        } else {
            const databaseURL = "https://optio-toll.firebaseio.com";
            var url = databaseURL + "/users/" + stripEmail(exists) + "/user.json";
            var xhttp = new XMLHttpRequest();
            xhttp.open("GET", url, false);
            xhttp.send();
            var retname = xhttp.responseText;
            var userObject = JSON.parse(retname);
            email.appendChild(document.createTextNode("Email: "+exists));
            first_name.appendChild(document.createTextNode("First Name: " + userObject.firstname));
            last_name.appendChild(document.createTextNode("Last Name: " + userObject.lastname));
            for (var i = 0; i<userObject.savedLocations.length; i++) {
                for (var key in userObject.savedLocations[i]) {
                    var dataPiece = userObject.savedLocations[i][key];
                    console.log(dataPiece);
                }
            }
            saved_loc.appendChild(document.createTextNode("Saved Locations: " + userObject.savedLocations));
            updateButton.disabled = true;
        }
        */
    }
});

ReactDOM.render(<AccountPanel />, document.getElementById('account_panel'));
