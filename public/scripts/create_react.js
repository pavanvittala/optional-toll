var InputPanel = React.createClass({
    render: function() {
        return (
            <div id="input">
            <br/>
            First Name:   <input type="text" name="firstname" placeholder="First Name" id="first-name" />
            <br/>
            <br/>
            Last Name:   <input type="text" name="lastname " placeholder="Last Name" id="last-name" />
            <br/>
            <br/>
            Email Address:   <input type="text" name="email " placeholder="Email Address" id="email-address" />
            <br/>
            <br/>
            Create Password:   <input type="password" name="password " placeholder="Password" id="ps" />
            <br/>
            <br/>
            Confirm Password:   <input type="password" name="confirmPassword " placeholder="Confirm Password" id="confirm-ps" />
            <br/><br/>
            <SubmitUser />
            <br/>
            <br/>
            </div>
        );
    }
});


var SubmitUser = React.createClass({
    render: function() {
        return(
            <div>
                <input onClick={this.submitUser} type="submit" value="Submit" id="submit-data" />
            </div>
        );
    },

    submitUser: function() {
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
    }
});

ReactDOM.render(
<InputPanel />,
    document.getElementById('inputPanel')
);


