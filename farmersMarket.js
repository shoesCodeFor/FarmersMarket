/**
 * Farmers Market JS - A simple app to plot local farmer's markets.
 *
 * This file contains functions for the search
 *
 * @author: Schuyler Ankele
 */

/**
 * Represents a single farmers market
 * @constructor
 */
function market() {
    var id = -1;
    var name;
    var distance = -1.0;
    var address;
    var url;
    var products = [];
    var hours = {};

}
/**
 * @constructor
 * @param {int} id - used to trigger marketDetails
 * @param {string} name - name of the market
 * @param {float} distance - results are returned in an array of 10 listed by shortest distance
 * @param {string} address - used for geocoding on the map
 */
function market(id, name, distance, address) {
    this.id = id;
    this.name = name;
    this.distance = distance;
    this.address = address;
}

function market(id, name, distance, address, url, products, hours) {
    this.id = id;
    this.name = name;
    this.distance = distance;
    this.address = address;
    this.url = url;
    this.products = products;
    this.hours = hours;
}

var markets = [];

const marketTable = document.getElementById('marketDetails');
mktTblHeader();


$(function () {
    // Click listener for the 'Search by Zip' button
    $("#search-submit").click(function () {
        // Clear all the rows except 1
        $('#marketDetails tr').slice(1).remove();
        // Make the API call with the ZIP
        marketsByZip($("#zip").val());
    });

});

/**
 * @param zipCode = 5 digit US Postal Zip Code
 * This method returns a JSON array of the markets
 */
function marketsByZip(zipCode){
    // jQuery AJAX
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: "https://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=" + zipCode,
        dataType: "jsonp",
        jsonpCallback: "marketsFilter",

    });
}

/**
 * Market by GPS will return a single JSON object with details about a certain location
 * @param lat
 * @param lng
 *
 */
function marketsByGPS(lat, lng){
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: "https://search.ams.usda.gov/farmersmarkets/v1/data.svc/locSearch?lat=" + lat + "&lng=" + lng,
        dataType: "jsonp",
        jsonpCallback: "marketsFilter"
    });
}

/**
 * @function marketFilter - iterates and parses through the return JSON array from USDA API
 *
 * The data is modeled and returned in a cleaned JS array of objects
 *
 * @param json_array
 */
function marketsFilter(json_array){
    for(var instance in json_array){
        var marketsArray = json_array[instance];
        for(var i = 0; i < marketsArray.length; i++){
            var marketDetail = marketsArray[i];
            market_obj = new market();
            for(key in marketDetail){
                if(key == "marketname"){
                    // Then its really two objects in a String 'Distance Market Name'
                    // We'll need to take the distance and name as separate strings
                    delimPos = marketDetail[key].search(/\./);
                    distInMI = parseFloat(marketDetail[key].substr(0, delimPos + 2));
                    console.log('This is mileage' + distInMI)
                    marketName = marketDetail[key].substr(delimPos + 3);
                    market_obj.name = marketName;
                    market_obj.distance = distInMI;
                }
                else{
                    // Catch an error if it exists
                    if(marketDetail[key] == 'Error'){
                        console.log('Oh NOOOO!!!' + marketDetail[key]);
                        alert('Please enter a valid 5 digit US Zip Code');
                        return;
                    }
                    var marketID = marketDetail[key];
                    console.log('Heres the id' + marketID);
                    market_obj.id = marketID;
                    marketDetails(market_obj.id);
                }
            }
            markets.push(market_obj);  // This creates an array of market objects
            buildRow(market_obj); // This populates the table with our results.
        }
    }

}

/**
 *  Build the header on our table.
 *  todo : Remove id column
 */
function mktTblHeader(){
    var header = marketTable.createTHead();
    th = header.insertRow(0);
    id_th = th.insertCell(0);
    id_th.innerHTML = 'ID';
    name_th = th.insertCell(1);
    name_th.innerHTML = 'Name';
    dist_th = th.insertCell(2);
    dist_th.innerHTML = 'Dist. in Miles';
    find_h = th.insertCell(3);
    find_h.innerHTML = 'Get Directions';
    marketTable.appendChild(th);
}

/**
 * This function accepts a single market instance and appends a row to the table
 * @param {obj} market_obj - is an instance of market()
 */
function buildRow(market_obj){
    tr = document.createElement('tr');
    _id = tr.insertCell(0);
    _id.innerHTML = market_obj.id;
    _name = tr.insertCell(1);
    _name.innerHTML = market_obj.name;
    _dist = tr.insertCell(2);
    _dist.innerHTML = market_obj.distance;
    _find = tr.insertCell(3);
    _find.innerHTML = '<button class="btn btn-outline-info" onclick="getDirections(' + market_obj.id + ')">Find On Map</button>';
    marketTable.appendChild(tr);

    // put back onclick="marketDetails('+ market_obj.id +')
}

/**
 *
 * @param {int} id
 */
function marketDetails(id) {
    $(document).queue(function () {

    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        async: false,
        // submit a get request to the restful service mktDetail.
        url: "http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=" + id,
        dataType: 'jsonp',
        jsonpCallback: 'detailsFilter'
    });

});
}

// Separate our market details
function detailsFilter(detailResponse) {
    for (var key in detailResponse) {
        //console.log(key);
        //alert(key);
        var details = detailResponse[key];
        console.log(details.Address);
        // mapByAddress(details.Address);
        //alert(details['GoogleLink']);
        // console.table(details);
        console.log('The address is:  ' + details['address']);

    }
}

