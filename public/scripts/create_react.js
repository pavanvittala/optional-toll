"use strict";
var users = firebase.database().ref('users');

var InputPanel = React.createClass( {
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


var SubmitUser = React.createClass( {
    render: function() {
        return(
            <div>
                <input onClick={this.submitUser} type="submit" value="Submit" id="submit-data" className="buttonthing" />
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

/*
describe('Create Account Panel', function() {
    var TestUtils = React.addons.TestUtils;

    it('can render correctly', function() {
        var component, element;
        element = React.createElement(InputPanel);
        component = TestUtils.renderIntoDocument(element);

        expect(function() {
            let button = TestUtils.findRenderedDOMComponentWithClass(component, 'buttonthing');
            expect(button).not.toBeUndefined();
            expect(button.value).toBe('Submit');
        }).not.toThrow();
    });
});


describe("Firebase Functionality", function(){
    describe("When the button is clicked", function() {
        var TestUtils = React.addons.TestUtils;
        var component, element;
        beforeEach(function(done){
            element = React.createElement(InputPanel);
            component = TestUtils.renderIntoDocument(element);
            var button = TestUtils.findRenderedDOMComponentWithClass(component, 'buttonthing');
            var fields = $("input");
            fields[0].value = "Yick";
            fields[1].value = "Yack";
            fields[2].value = "yick@yahoo.com";
            fields[3].value = "123";
            fields[4].value = "123";
            TestUtils.Simulate.click(button);
            spyOn(users, "once").and.callFake(function() {
                console.log("spying...");
                done();
            });
        });

        it("set to have been called", function() {
            expect(users.once).toHaveBeenCalled();
        });
    });
});
*/