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
        userName: React.PropTypes.string,
        email: React.PropTypes.string,
        savedLocations: React.PropTypes.array
    },

    getDefaultProps: function() {
        userName: ""
        email: ""
        savedLocations: []
    },

    render: function() {
        return(
            <div>
                <ul className="list-group">
                    <li className="list-group-item" id="list_email">{this.props.email}</li>
                    <li className="list-group-item" id="list_firstname">{this.props.userName}</li>
                    <li className="list-group-item" id="list_savedLoc">{this.props.savedLocations}</li>
                </ul>
                <input onClick = {this.loadData} type="submit" value="Update Information" id="update_button"></input>            
            </div>
        );
    },

    loadData: function() {
        var email = document.getElementById('list_email');
        var name = document.getElementById('list_firstname');
        var saved_loc = document.getElementById('list_savedLoc');
        var updateButton = document.getElementById('update_button');
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                var uid = user.uid;
                const databaseURL = "https://optio-toll.firebaseio.com";
                var url = databaseURL + "/GoogleUsers/" + uid + "/user.json";
                var xhttp = new XMLHttpRequest();
                xhttp.open("GET", url, false);
                xhttp.send();
                var retname = xhttp.responseText;
                var userObject = JSON.parse(retname);
                email.appendChild(document.createTextNode("Email: " + userObject.email));
                name.appendChild(document.createTextNode("Name: " + userObject.name));
                var dataPiece;
                var locationArray = [];
                var addressString = "";
                saved_loc.appendChild(document.createTextNode("Saved Locations: "));
                for (var i = 0; i<userObject.savedLocations.length; i++) {
                    for (var key in userObject.savedLocations[i]) {
                        dataPiece = userObject.savedLocations[i][key];
                        //console.log(key);
                        //console.log(typeof key);
                        if (key === "place") {
                            locationArray[0] = dataPiece;
                        } else if (key === "street") {
                            locationArray[1] = dataPiece;
                        } else if (key === "cityState") {
                            locationArray[2] = dataPiece;
                        } else if (key === "zipCode") {
                            locationArray[3] = dataPiece;
                        } else if (key === "country") {
                            locationArray[4] = dataPiece;
                        }
                    }
                    for (var j = 0; j < locationArray.length; j++) {
                        if (j == locationArray.length) {
                            addressString+=locationArray[j];
                        } else if (j == 0) {
                            addressString+=locationArray[j]+": ";       
                        } else if (j == 3) {
                            addressString+=locationArray[j]+", ";       
                        } else {
                            addressString+=locationArray[j]+" ";   
                        }
                    }
                    //Append to DOM
                    saved_loc.appendChild(document.createTextNode(addressString));
                    //console.log(addressString);
                }
                //saved_loc.appendChild(document.createTextNode("Saved Locations: " + userObject.savedLocations));
                updateButton.disabled = true;
            } else {
                // No user is signed in.
                email.appendChild(document.createTextNode("Email: Not Logged In"));
                name.appendChild(document.createTextNode("First Name: -"));
                saved_loc.appendChild(document.createTextNode("Saved Locations: -"));
                updateButton.disabled = true;
            }
        });
    }
});

ReactDOM.render(<AccountPanel />, document.getElementById('account_panel'));
