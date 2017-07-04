/**
 * mapquest_client.js is a simple API Client using MapQuest.js based n their documentation -
 * @link - https://developer.mapquest.com/documentation/mapquest-js/v0.3/
 */

/*
 * Overly complicated for the Mapquest interview I am hoping to get
 * returns a JSON object to js objects
 */

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

var apiKeys = $.getValues("http://busybeetech.x10host.com/mapquest/index.php");


/**
 * @function {void} - returns a map centered on the
 */
function initMap(){
     // Should be ck
    L.mapquest.key = apiKeys.ck;
    L.mapquest.map('map_canvas',
        {
            center: [39.750307, -104.999472], // Center on Mapquest Denver Dev Office
            layers: L.mapquest.tileLayer('map'),
            zoom: 14
        });

}

    /**
 *
 * @param address
 */
function mapByAddress(address){


        L.mapquest.geocoding().geocode(address, console.log('called back'));

        /**
        function createMap(error, response) {
            var location = response.results[0].locations[0];
            var latLng = location.displayLatLng;
            var map = L.mapquest.map('map_canvas', {
                center: latLng,
                layers: L.mapquest.tileLayer('map'),
                zoom: 14
            });
        }
         **/


}

function urlConverter(url){
    var convertedURL = '';


    return convertedURL;

}





