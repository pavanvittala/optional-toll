/**
 * Created by PavanVittala on 10/2/16.
 */

//Our key is an email address. The path for children in Firebase cannot contain periods
//So the period from the email address must be replaced with a comma.
function stripEmail(email) {
    return email.replace('.', ',');
}

function deStripEmail(email) {
    return email.replace(',', '.');
}
