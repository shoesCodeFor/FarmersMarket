    jQuery.extend({
        getValues: function(url) {
            var result = null;
            $.ajax({
                url: url,
                type: 'get',
                dataType: 'json',
                async: false,
                success: function(data) {
                    result = data;
                }
            });
            return result;
        }
    });

    var apiKeys = $.getValues("http://busybeetech.x10host.com/mapquest/index.php");


    function buildMap(){
        L.mapquest.key = apiKeys.ck; // Should be ck
        L.mapquest.map('map_canvas', {
            center: [39.750307, -104.999472], // Center on Mapquest Denver Dev Office
            layers: L.mapquest.tileLayer('map'),
            zoom: 14
        });
    }

    function geoByAddress(address){
        fetch('http://www.mapquestapi.com/geocoding/v1/address?key=KEY&location=' + address).then(function ()
        {
            var mapCanvas = document.getElementById('mad-canvas');
            mapCanvas.innerHTML = this.response;
        }).catch(console.log('Bad Address'));
    }



    console.log(apiKeys.ck);

