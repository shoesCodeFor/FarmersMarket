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
    L.mapquest.key = apiKeys.ck; // Should be ck
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
function geoByAddress(address){
    fetch('http://www.mapquestapi.com/geocoding/v1/address?key=KEY&location=' + address).then(
        function () {
            var mapCanvas = document.getElementById('map-canvas');
            mapCanvas.innerHTML = this.response;
            }).catch(console.log('Bad Address'));
}


