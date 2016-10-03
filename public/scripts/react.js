//Holds view information for account.html

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
                        <UpdateData userLoggedIn={this.state.userLoggedIn}/>
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
            <ul className="list-group">
                <li className="list-group-item" id="list_email">{this.props.email}</li>
                <li className="list-group-item" id="list_firstname">{this.props.firstname}</li>
                <li className="list-group-item" id="list_lastname">{this.props.lastname}</li>
                <li className="list-group-item" id="list_savedLoc">{this.props.savedLocations}</li>
            </ul>
        );
    }

});

var UpdateData = React.createClass({
    render: function() {
        return (
            <div id="update_button">
                <input type="submit" value="Update Information" id="update_button"></input>
            </div>
        );
    }
});

ReactDOM.render(
    <AccountPanel />,
    document.getElementById('account_panel')
);
console.log("Finished with react.js");
