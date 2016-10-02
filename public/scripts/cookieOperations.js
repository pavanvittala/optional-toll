/**
 * Created by PavanVittala on 10/1/16.
 */
//Operations that enable the usage of cookies for user accounts

function createCookie(name, value, days) {
    var expires;
    if (days != 0) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    } else {
        expires = "";
    }
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var half = name + "=";
    var stringArray = document.cookie.split(";");
    for (var i = 0; i< stringArray.length; i++) {
        var string = stringArray[i];
        while (string.charAt(0) == ' ') {   //Eliminate spaces at the start of the cookie string
            string = string.substring(1, string.length);
        }
        if (string.indexOf(half) == 0) {    //We've found the value
            return string.substring(half.length, string.length);
        }
    }
    return null;
}

function deleteCookie(name) {
    createCookie(name, "", -1);
}

$(document).ready(function() {
    $("#logout_link").click(function () {
        var check = readCookie("email");
        if (check == null) {
            alert("Not logged in");
        } else {
            deleteCookie("email");
        }
    });
});