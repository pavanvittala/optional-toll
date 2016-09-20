
/**
 * Created by Ken on 9/19/2016.
 */
$(document).ready(function(){
    $("#submitButton").click(function() {
        var welcome = document.createTextNode("Welcome ");//creates the beginning of the welcome message
        document.getElementById("loginmessage").appendChild(welcome);
        var UserV = document.getElementById("User");
        var name = document.createTextNode(UserV.value);
        //wel.appendchild(name);
        document.getElementById("loginmessage").appendChild(name);

    });
});


