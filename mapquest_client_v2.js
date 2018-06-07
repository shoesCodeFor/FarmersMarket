/*
 *
 * mapquest_client.js is a simple API Client using MapQuest.js based on their documentation -
 * @link - https://developer.mapquest.com/documentation/mapquest-js/v1.3.1/
 */

// Init Global Vars

L.mapquest.key = apiKeys.ck;
L.mapquest.open = true;
var gMap;

const initMap = function (center = [0,0]) {
    gMap = L.mapquest.map('map_canvas',
        {
            center: center, // Center on Mapquest Denver Dev Office
            layers: L.mapquest.tileLayer('map'),
            zoom: 14
        });
};


const findMyLocation = function (){
    try{
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position.coords);
            userLocation[0] = position.coords.latitude;
            userLocation[1] = position.coords.longitude;
        });
    }
    catch (e){
        alert('We cannot find your location. \n Error:' + e);
    }
};

const fiveBoxGeocode = function (street = '', city = '', state = '', postalCode = '', country = ''){
    let locationObj = {
        // In the location object all fields are optional, but must be entered as blank vals if not used
        street: street,
        city: city,
        state: state,
        postalCode: postalCode,
        country: country // Must be 2-digit ISO
    };
    L.mapquest.geocoder.geocode(locationObj, function (response) {return response});

};

