/**
 * Created by PavanVittala on 10/2/16.
 */

console.log("In account.js");
$(document).ready(function() {
    $('#update_button').click(function() {
        var exists = readCookie('email');
        var email = document.getElementById('list_email');
        var first_name = document.getElementById('list_firstname');
        var last_name = document.getElementById('list_lastname');
        var saved_loc = document.getElementById('list_savedLoc');
        var updateButton = document.getElementById('update_button');
        if (exists == null) {
            email.appendChild(document.createTextNode("Email:"));
            first_name.appendChild(document.createTextNode("First Name:"));
            last_name.appendChild(document.createTextNode("Last Name:"));
            saved_loc.appendChild(document.createTextNode("Saved Locations:"));
            updateButton.disabled = true;
        } else {
            updateButton.disabled = true;
        }
    });
});
