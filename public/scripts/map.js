/**
 * Created by PavanVittala on 9/15/16.
*/

var count = 0;
var map;
var markersArray = [];
var directionsDisplay;

function clearMarkers() {
    while (markersArray.length) {
        markersArray.pop().setMap(null);
    }
    markersArray.length = 0;
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 41.850033, lng: -87.6500523},
        zoom: 4
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

//Shows/hides address input tab for directions
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

//Function for searching Google Maps for places/ locations
$(document).ready(function(){
    $("#submitSearch").click(function() {
        clearMarkers();
        directionsDisplay.set('directions', null);
        var searchInput = $("#searchInput").val()   //The input typed by the user into the search box
        var service = new google.maps.places.PlacesService(map);    //Google service that handles Places
        var infoWindow = new google.maps.InfoWindow({map: map});
        var lat;
        var lng;
        var currentLocation;
        if (navigator.geolocation) {    //If the navigator supports geolocation
            navigator.geolocation.getCurrentPosition(function(position) {   //Retrieve data about the current position
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude

                };
                lat = position.coords.latitude;
                lng = position.coords.longitude;
                currentLocation = new google.maps.LatLng(lat, lng);
                var request = { //Create a request for PlacesService
                    location: currentLocation,
                    radius: '100',
                    query: searchInput
                };
                service.textSearch(request, callback);
                infoWindow.setPosition(pos);
                infoWindow.setContent('You are here');  //Put infopane on current location
                map.setCenter(pos); //Center on the current position
                map.setZoom(15);    //Zoom appropriately
            }, function() { //Handle location error
                handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
    });
});

//Callback for a text search in the Google Maps API
function callback(results, status) {
    var marker;
    var place;
    var name;
    var address;
    var phone;
    var rating;
    var website;
    var description;
    if (status == google.maps.places.PlacesServiceStatus.OK) {  //If the PlacesServices request succeeds
        for (var i = 0; i<results.length; i++) {    //Create results.length number of markers and infopanes
            place = results[i];
            marker = new google.maps.Marker({position: results[i].geometry.location, map: map, title: "Title"});    //Create marker at location of result

            //The next few lines are for formatting the information on the infopanes
            name = "<h4>" + place.name + "</h4><br>";
            address = place.formatted_address;
            phone = place.formatted_phone_number;
            rating = place.rating;
            website = place.website;
            if (address != null) {  //Only put address on the pane if it isn't null
                address = "<p><h5>Address:</h5> " + place.formatted_address + "</p><br>";
                description = name+address;
            }
            if (phone != null) {    //Only put phone on the pane if it isn't null
                phone = "<p><h5>Phone:</h5> " + place.formatted_phone_number + "</p><br>";
                description = description+phone;
            }
            if (rating != null) {   //Only put rating on the pane if it isn't null
                rating = "<p><h5>Rating:</h5> " + place.rating + "</p><br>";
                description = description+rating;
            }
            if (website != null) {  //Only put website on the pane if it isn't null
                website = "<p><h5>Website:</h5> " + place.website + "</p><br>";
                description = description+website;
            }
            //Call a function to create infopanes for each marker
            insertInfoWindow(marker, description);
        }
    }
}

function insertInfoWindow(marker, message) {
    //Load the message into the infopane
    var infoWindow = new google.maps.InfoWindow({
       content: message
    });

    //Add a listener to each marker with the appropriate pane with the right information
    markersArray.push(marker);
    google.maps.event.addListener(marker, 'click', function() {
       infoWindow.open(map, marker);
    });
}

//Code for getting a route between two points
$(document).ready(function() {
    //Save originals
    var directionsDisplayOriginal = new google.maps.DirectionsRenderer();
    var directionsServiceOriginal = new google.maps.DirectionsService();
    directionsDisplayOriginal.setMap(map);
    $("#submitDirections").click(function () {
        clearMarkers();
        directionsDisplay = new google.maps.DirectionsRenderer();
        var directionsService = new google.maps.DirectionsService();
        directionsDisplay.setMap(map);
        directionsDisplay=directionsDisplayOriginal;
        directionsService=directionsServiceOriginal;
        var start = document.getElementById('fromAddress'); //Origin address
        var end = document.getElementById('toAddress'); //Destination address
        if (start.value === "" || end.value === "") {   //Both start and end needs to have values in them
            alert("Either From Address or To Address is empty");
            return;
        }
        var request = { //Create a routing request
            origin: start.value,
            destination: end.value,
            travelMode: 'DRIVING'
        };
        directionsService.route(request, function(result, status) { //The route function returns a status
            //Only display if the status is OK
            if (status == 'OK') {
                directionsDisplay.setDirections(result);
                count++;
            } else if (status == 'NOT_FOUND') {
                alert("Origin or destination not found");
                return;
            } else if (status == 'ZERO_RESULTS') {
                alert("No results");
                return;
            }
        });
    });
});
