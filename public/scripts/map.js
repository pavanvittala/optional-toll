/**
 * Created by PavanVittala on 9/15/16.
*/


var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 0, lng: 0},
        zoom: 2
    });
}

//Function that changes the number of tolls displayed in the toll table.
//function refreshTable() {
$(document).ready(function(){
    $('#refreshButton').click(function(){
        var defaultTollNumber = $('#tableOfTolls').data('default');
        var numTolls = document.getElementById("numTolls").value;   //New number of rows you want
        var table = document.getElementById("tolltable");   //Save the table object on the page
        var tableNumRows = table.rows.length-1;   //Number of rows actually there, -1 because we have a label row
        /*  For debugging purposes
        console.log("Number of rows you want: ");console.log(numTolls);
        console.log("Number of rows you have: ");console.log(tableNumRows);
        */
        if (numTolls > defaultTollNumber) {
            alert("A maximum of 4 tolls can be displayed at once");
        } else if (numTolls < tableNumRows) {  //Decrease the number of rows
            var tableCreation = tableNumRows-numTolls;
            for (var i = 0; i<tableCreation; i++) {
                table.deleteRow(-1);    //Delete the row, the -1 paramater deletes the last row of the table
                table.rows.length--;    //Decrement the row value for the table
                tableNumRows = table.rows.length;
            }
        } else if (numTolls > tableNumRows) {   //Increase the number of rows
            var tableCreation = numTolls - tableNumRows;
            /*  For debugging purposes
            console.log("Number of Rows you want: " + numTolls);
            console.log("Number of rows currently there: " + tableNumRows);
            */
            var row;
            for (var i = 0; i<tableCreation; i++) { //Add row
                row = table.insertRow(-1);
                table.rows.length++;
                tableNumRows = table.rows.length;
                for (var j = 0; j<2; j++) { //Add cells to the row
                    var cell = row.insertCell(j);
                    cell.innerHTML = "Placeholder";
                }
                //Next three lines are for adding a centered checkbox to the third cell in a new row
                var cell = row.insertCell(-1);
                cell.innerHTML = "<input type=\"checkbox\" checked=\"checked\"/>"
                cell.style.textAlign = "center";
            }
        }
    });
});

$(document).ready(function(){
    $("#show-hide-button-address").click(function(){
        var button = document.getElementById("hideAddress");
        if (button.value == "Hide Directions") {
            $("#addressInput").hide();
            button.value = "Show Directions";
            history.pushState(null, null, "map.html");
        } else if (button.value == "Show Directions") {
            $("#addressInput").show();
            button.value = "Hide Directions";
            history.pushState(null, null, "map.html");
        }
    });
});

//Shows/hides toll data tab
$(document).ready(function(){
    $("#show-hide-button-tolls").click(function(){
        var button = document.getElementById("hideTolls");
        if (button.value == "Hide Tolls") {
            $("#tableOfTolls").hide();
            button.value = "Show Tolls";
        } else if (button.value == "Show Tolls") {
            $("#tableOfTolls").show();
            button.value = "Hide Tolls";
        }
    });
});

$(document).ready(function(){
    $("#submitSearch").click(function() {
        var searchInput = $("#searchInput").val()
        var service = new google.maps.places.PlacesService(map);
        var infoWindow = new google.maps.InfoWindow({map: map});
        var lat;
        var lng;
        var currentLocation;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude

                };
                lat = position.coords.latitude;
                lng = position.coords.longitude;
                currentLocation = new google.maps.LatLng(lat, lng);
                var request = {
                    location: currentLocation,
                    radius: '100',
                    query: searchInput
                };
                service.textSearch(request, callback);
                infoWindow.setPosition(pos);
                infoWindow.setContent('Location found.');
                map.setCenter(pos);
                map.setZoom(15);
            }, function() {
                handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
    });
});

function callback(results, status) {
    var marker;
    var place;
    var name;
    var address;
    var phone;
    var rating;
    var website;
    var description;
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i<results.length; i++) {
            place = results[i];
            marker = new google.maps.Marker({position: results[i].geometry.location, map: map, title: "Title"});
            //console.log(address, phone, rating, website);
            name = "<h4>" + place.name + "</h4><br>";
            address = place.formatted_address;
            phone = place.formatted_phone_number;
            rating = place.rating;
            website = place.website;
            if (address != null) {
                address = "<p><h5>Address:</h5> " + place.formatted_address + "</p><br>";
                description = name+address;
            }
            if (phone != null) {
                phone = "<p><h5>Phone:</h5> " + place.formatted_phone_number + "</p><br>";
                description = description+phone;
            }
            if (rating != null) {
                rating = "<p><h5>Rating:</h5> " + place.rating + "</p><br>";
                description = description+rating;
            }
            if (website != null) {
                website = "<p><h5>Website:</h5> " + place.website + "</p><br>";
                description = description+website;
            }
            insertInfoWindow(marker, description);
        }
    }
}

function insertInfoWindow(marker, message) {
    var infoWindow = new google.maps.InfoWindow({
       content: message
    });

    google.maps.event.addListener(marker, 'click', function() {
       infoWindow.open(map, marker);
    });
}

