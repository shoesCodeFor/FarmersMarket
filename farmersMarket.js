/**
 * Farmers Market JS - A simple app to plot local farmer's markets.
 *
 * This file contains functions for the search
 *
 * @author: Schuyler Ankele
 */

var markets = [];
const newBullet = document.createElement('li');
const marketUL = document.getElementById('marketDetails');

$("#search-submit").click(function () {
    marketsByZip($("#zip").val());
    console.log(markets);
});


/**
 * @param zipCode = 5 digit US Postal Zip Code
 */

function marketsByZip(zipCode){
    // jQuery AJAX
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=" + zipCode,
        dataType: "jsonp",
        jsonpCallback: "marketsFilter"
    });
}

function marketsByGPS(lat, lng){
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/locSearch?lat=" + lat + "&lng=" + lng,
        dataType: "jsonp",
        jsonpCallback: "marketsFilter"
    });
}

function marketsFilter(json_array){
    // We'll fire the marketDetails during the inner most loop
    for(var instance in json_array){
        var j = 0;
        var marketObject = json_array[instance];
        var listItem = newBullet;
        // console.table(marketObject);
        for(let i = 0; i < marketObject.length; i++){
            var marketDetail = marketObject[i];

            // console.table(marketDetail);
            for(key in marketDetail){
                if(key == "marketname"){ // Then its really two objects in a String 'Distance Market Name'
                    // We'll need to take the distance and name as seperate strings
                    var delimPos = marketDetail[key].search(/\./);
                    var distInMI = parseFloat(marketDetail[key].substr(0, delimPos + 2));

                    var marketName = marketDetail[key].substr(delimPos + 3);
                    console.log('Market Name: ' + marketName);
                    console.log(distInMI);
                    console.log(marketDetail[key]);
                    listItem.innerHTML += ' Name: ' + marketName + '<br>Dist (mi):' + distInMI + '<br>';
                }
                else{
                    var marketID = marketDetail[key];
                    console.log('Market ID: ' + marketID);
                    listItem.innerHTML += '<br>ID: ' + marketID + '<br>';

                }
            }

        }
        marketUL.appendChild(listItem);
    }
}




function marketDetails(id) {
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        // submit a get request to the restful service mktDetail.
        url: "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=" + id,
        dataType: 'jsonp',
        jsonpCallback: 'detailsFilter'
    });
}
// Separate our market details
function detailsFilter(detailResponse) {
    for (var key in detailResponse) {
        console.log(key);
        //alert(key);
        var details = detailResponse[key];
        console.log(details);
        //alert(details['GoogleLink']);
        console.table(details);
    }
}