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

/*
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 41.850033, lng: -87.6500523},
        zoom: 4
    });
}
*/

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 41.850033, lng: -87.6500523},
        zoom: 4
    });
    var searchInput = /** @type {!HTMLInputElement} */(
        document.getElementById('pac-input'));
        var types = document.getElementById('type-selector');
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(searchInput);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);

        var searchAutocomplete = new google.maps.places.Autocomplete(searchInput);
        searchAutocomplete.bindTo('bounds', map);

        /*
        var fromAutocomplete = new google.maps.places.Autocomplete(input);
        searchAutocomplete.bindTo('bounds', map);
        var toAutocomplete = new google.maps.places.Autocomplete(input);
        searchAutocomplete.bindTo('bounds', map);
        */

        var infowindow = new google.maps.InfoWindow();
        var marker = new google.maps.Marker({
          map: map,
          anchorPoint: new google.maps.Point(0, -29)
        });

        searchAutocomplete.addListener('place_changed', function() {
            $('#spinner').toggle();
            clearMarkers();
            if (directionsDisplay != null) {
                directionsDisplay.set('directions', null);
            }
            infowindow.close();
          marker.setVisible(false);
          var place = searchAutocomplete.getPlace();
          if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            // My original implementation of search is called in this case
            clearMarkers();
            if (directionsDisplay != null) {
                directionsDisplay.set('directions', null);
            }
            //var searchInput = $("#searchInput").val()   //The input typed by the user into the search box
            var searchInput = $("#pac-input").val();
            //console.log(searchInput);
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
                    $('#spinner').toggle();
                }, function() { //Handle location error
                    handleLocationError(true, infoWindow, map.getCenter());
                });
            } else {
                // Browser doesn't support Geolocation
                handleLocationError(false, infoWindow, map.getCenter());
            }
            return;
          }

          // If the place has a geometry, then present it on a map.
          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
          }
          /*
          marker.setIcon(({
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
          }));
            */
          marker.setPosition(place.geometry.location);
          marker.setVisible(true);
          var address = '';
          if (place.address_components) {
            address = [
              (place.address_components[0] && place.address_components[0].short_name || ''),
              (place.address_components[1] && place.address_components[1].short_name || ''),
              (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
          }

          infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
          infowindow.open(map, marker);
          $('#spinner').toggle();
        });

        // Sets a listener on a radio button to change the filter type on Places
        // Autocomplete.
        function setupClickListener(id, types) {
          var radioButton = document.getElementById(id);
          radioButton.addEventListener('click', function() {
            searchAutocomplete.setTypes(types);
          });
        }

        setupClickListener('changetype-all', []);
        setupClickListener('changetype-address', ['address']);
        setupClickListener('changetype-establishment', ['establishment']);
        setupClickListener('changetype-geocode', ['geocode']);
      }


//Function that changes the number of tolls displayed in the toll table.
//function refreshTable() {
/*
$(document).ready(function(){
    $('#refreshButton').click(function(){
        var defaultTollNumber = $('#tableOfTolls').data('default');
        var numTolls = document.getElementById("numTolls").value;   //New number of rows you want
        var table = document.getElementById("tolltable");   //Save the table object on the page
        var tableNumRows = table.rows.length-1;   //Number of rows actually there, -1 because we have a label row
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
*/

/*
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
*/

//Shows/hides toll data tab
/*
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
*/

//Function for searching Google Maps for places/ locations
$(document).ready(function(){
    $("#submitSearch").click(function() {
        clearMarkers();
        if (directionsDisplay != null) {
            directionsDisplay.set('directions', null);
        }
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
    //Code for setting zoom after all the markers have been added to the map and the markersArray
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i<markersArray.length; i++) {
        bounds.extend(markersArray[i].getPosition());
    }
    map.fitBounds(bounds);
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
        $('#spinner').toggle();
        clearMarkers();
        directionsDisplay = new google.maps.DirectionsRenderer();
        var directionsService = new google.maps.DirectionsService();
        directionsDisplay.setMap(map);
        directionsDisplay=directionsDisplayOriginal;
        directionsService=directionsServiceOriginal;
        //var start = document.getElementById('fromAddress'); //Origin address
        //var end = document.getElementById('toAddress'); //Destination address
        var start = document.getElementById('pac-input-dir-from'); //Origin address
        var end = document.getElementById('pac-input-dir-to'); //Destination address
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
                $('#spinner').toggle();
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
