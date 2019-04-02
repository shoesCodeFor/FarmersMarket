/*
 * mapquest_client.js is a simple API Client using MapQuest.js based n their documentation -
 * @link - https://developer.mapquest.com/documentation/mapquest-js/v0.3/
 */

// Static function to extend jQuery ajax and pull data into a var
jQuery.extend({
    getValues: function(url) {
        var fetchedData = null;
        $.ajax({
            url: url,
            type: 'get',
            dataType: 'json',
            async: false,
            success: function(data) {
                fetchedData = data;
            }
        });
        return fetchedData;
    }
});

var apiKeys = 'VXLcMs4sGBfYpLAckWsEQtYsqbvfWcGA';

L.mapquest.key = apiKeys;
L.mapquest.open = true;
var userLocation = [{lat:39.75, lng: -104.999472}];
var userAddress;

/**
 * @function {void} - returns a map into a global var centered on the specified GPS
 *
 */
function initMap() {
    gMap = L.mapquest.map('map_canvas',
        {
            center: [39.750307, -104.999472], // Center on Mapquest Denver Dev Office
            layers: L.mapquest.tileLayer('map'),
            zoom: 14
        });
}

/**
 * @function {void} - this will take the user locale and plot it on the map
 */
const findMyLocation = function (){
    // A default

    try{
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position.coords);
            userLocation[0] = position.coords.latitude;
            userLocation[1] = position.coords.longitude;
            L.mapquest.geocoding().reverse(userLocation, addressCallback);

            var customIcon = L.mapquest.icons.circle({
                primaryColor: '#3b5998',
                draggable: true,
                riseOnHover: true
            });

            var home = L.marker(userLocation, { icon: customIcon }).addTo(gMap);
            home.bindPopup("You are here ").openPopup();
        });
    }
    catch (e){
        alert('We cannot find your location. \n Error:' + e);
    }
};

function addressCallback(error, response){
    // Grab the address into a var
    try{
        userAddress = response.results[0].locations[0];
        // Fly to the new location
        gMap.flyTo(userAddress.latLng);
        // Make the Zip a 5 digit one
        userAddress.zip = userAddress.postalCode.split("-")[0];
        // Let the flyTo finish
        setTimeout(function (){
            marketsByZip(userAddress.zip);
        }, 500);
    }
    catch (error) {
        alert(error);
    }
}

/**
 *
 * @param address
 */
function mapByAddress(address){
    L.mapquest.key = apiKeys.ck;
    L.mapquest.geocoding().geocode(address, console.log('called back'));
}


function openGeocoding(address) {
   
    var openEndpoint = "http://www.mapquestapi.com/geocoding/v1/address?";
    openEndpoint+="key=" + apiKeys.ck + '&location=' + address;
    //var geoResult = $.getValues(openEndpoint);
    fetch(openEndpoint).then(function(response){
        console.log(response.text());
    });
    // console.log(geoResult);
    
}

function buildPopup(error, response) {
    if(!error){
        var location = response.results[0].locations[0];
        var street = location.street;
        var city = location.adminArea5;
        var state = location.adminArea3;
        popup.setContent(street + ', ' + city + ', ' + state);
    }
    else{alert(error)};
}

function getDirections(_address){
    L.mapquest.key = apiKeys.ck;
    L.mapquest.directions().route({
       start: userAddress.street + ' ' + userAddress.adminArea5,
       end: _address
    });
    // dir.addTo(gMap);
    console.log(_address);
    console.log(userAddress);


}





