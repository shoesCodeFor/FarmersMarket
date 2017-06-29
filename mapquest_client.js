
function buildMap(divID){

    L.mapquest.key = 'LGPoPM58dIK7wqxOTANGqNItYbGxwuAv'; // Should be ck
    // console.log(L.mapquest.key);
    L.mapquest.map('map_canvas', {
        center: [37.7749, -122.4194],
        layers: L.mapquest.tileLayer('map'),
        zoom: 12
    });
}

//var mqKey = '';

    var mqKey = $.getJSON('http://busybeetech.x10host.com/mapquest/index.php', function (data) {
        alert('KEY' + data.ck);
        return data.ck.toString();

    });

console.log(mqKey);
console.log(mqKey.length);
//console.log(apiKey);