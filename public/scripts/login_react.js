var LoginPanel = React.createClass({
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


