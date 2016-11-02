/*
"use strict";

var config = {
    apiKey: "AIzaSyAjbetBiCaHcNJbiWd3eBywO1jYufYVVxI",
    authDomain: "optio-toll.firebaseapp.com",
    databaseURL: "https://optio-toll.firebaseio.com",
    storageBucket: "optio-toll.appspot.com",
    messagingSenderId: "163118324324"
};
//firebase.initializeApp(config);
var GoogleUsers = firebase.database().ref('GoogleUsers');


var LoginPanel = React.createClass( {
    render: function() {
        return (
            <div className="container">
            <form className="form-signin">
            <h2 className="form-signin-heading">Please sign in</h2>
        <label htmlFor="inputEmail" className="sr-only">Email address</label>
        <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required />
        <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
        <div className="checkbox">
            <label>
            <input type="checkbox" value="remember-me" id="remember" /> Remember me
        </label>
        </div>
            <LoginUser />
            </form>
            </div>
        );
    }
});


var LoginUser = React.createClass({
    render: function() {
        return(
            <div>
                <button onClick={this.loginUser} className="btn btn-lg btn-primary btn-block" type="submit" id="submit">Sign in</button>
            </div>
        );
    },

    loginUser: function() {
        var submitButton = document.getElementById("submit");
        var rememberCheckBox = document.getElementById("remember");
        var email = document.getElementById("inputEmail").value;
        var passwd = document.getElementById("inputPassword").value;
        loginUser(email, passwd, rememberCheckBox);
    }
});


ReactDOM.render(
<LoginPanel />,
    document.getElementById('containerThing')
);
*/


/*
describe('Login Account Panel', function() {
    var TestUtils = React.addons.TestUtils;

    it('can render correctly', function() {
        var component, element;
        element = React.createElement(LoginPanel);
        component = TestUtils.renderIntoDocument(element);

        expect(function() {
            let button = TestUtils.findRenderedDOMComponentWithTag(component, 'button');
            expect(button).not.toBeUndefined();
            expect(button.innerHTML).toBe('Sign in');
        }).not.toThrow();
    });
});

describe("Login Functionality", function(){
    describe("When the button is clicked", function() {
        var TestUtils = React.addons.TestUtils;
        var component, element;
        beforeEach(function(done){
            element = React.createElement(InputPanel);
            component = TestUtils.renderIntoDocument(element);
            var button = TestUtils.findRenderedDOMComponentWithTag(component, 'button');
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


