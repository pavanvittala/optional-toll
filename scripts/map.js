/**
 * Created by PavanVittala on 9/15/16.
 */
//Scripts for map.html

//Function that changes the number of tolls displayed in the toll table.
$(document).ready(function() {
    $("#refreshButton").click(function () {
        var defaultTollNumber = $('#tableOfTolls').data('default');
        var numTolls = document.getElementById("numTolls").value;   //New number of rows you want
        var table = document.getElementById("tolltable");   //Save the table object on the page
        var tableNumRows = table.rows.length - 1;   //Number of rows actually there, -1 because we have a label row
        /*  For debugging purposes
         console.log("Number of rows you want: ");console.log(numTolls);
         console.log("Number of rows you have: ");console.log(tableNumRows);
         */
        if (numTolls > defaultTollNumber) {
            alert("A maximum of 4 tolls can be displayed at once");
        } else if (numTolls < tableNumRows) {  //Decrease the number of rows
            var tableCreation = tableNumRows - numTolls;
            for (var i = 0; i < tableCreation; i++) {
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
            for (var i = 0; i < tableCreation; i++) { //Add row
                row = table.insertRow(-1);
                table.rows.length++;
                tableNumRows = table.rows.length;
                for (var j = 0; j < 2; j++) { //Add cells to the row
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
            //history.pushState(null, null, "map.html");
        } else if (button.value == "Show Directions") {
            $("#addressInput").show();
            button.value = "Hide Directions";
            //history.pushState(null, null, "map.html");
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
