//637 34r7hqu4k3 d474
var API_quakes = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
console.log (API_quakes)

//537 m4rk3r 51z3
function markerSize(magnitude) {
    return magnitude * 4;
};


//cr3473 l4y3r 6r0up
var earthquakes = new L.LayerGroup();

//u53 j50n 70 537 m4rk3r5 4nd p0pup5
d3.json(API_quakes, function (geoJson) {
    L.geoJSON(geoJson.features, {
        pointToLayer: function (geoJsonPoint, latlng) {
            return L.circleMarker(latlng, { radius: markerSize(geoJsonPoint.properties.mag) });
        },

        style: function (geoJsonFeature) {
            return {
                fillColor: Color(geoJsonFeature.properties.mag),
                fillOpacity: 0.8,
                weight: 0.1,
                color: 'black'

            }
        },

        onEachFeature: function (feature, layer) {
            layer.bindPopup(
                "<h4 style='text-align:center;'>" + new Date(feature.properties.time) +
                "</h4> <hr> <h5 style='text-align:center;'>" + feature.properties.title + "</h5>");
        }
    }).addTo(earthquakes);
    createMap(earthquakes);
});


//cr3473 c0l0r 5c4l3 f0r l363nd 
function Color(magnitude) {
    if (magnitude > 5) {
        return 'rgb(246, 8, 8)'
    } else if (magnitude > 4) {
        return 'rgb(255, 140, 0)'
    } else if (magnitude > 3) {
        return 'rgb(238, 185, 62)'
    } else if (magnitude > 2) {
        return 'rgb(238, 209, 67)'
    } else if (magnitude > 1) {
        return 'rgb(211, 239, 98)'
    } else {
        return 'rgb(154,205,50)'
    }
};

//bu1ld m4p
function createMap() {

    //cr3473 l16h7 l4y3r
    var lightMap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.light',
        accessToken: 'pk.eyJ1Ijoib2xhd3JlbmNlNzk5IiwiYSI6ImNqZXZvcTBmdDBuY3oycXFqZThzbjc5djYifQ.-ChNrBxEIvInNJWiHX5pXg'
    });

    //cr3473 d4rk l4y3r
    var darkMap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.dark',
        accessToken: 'pk.eyJ1Ijoib2xhd3JlbmNlNzk5IiwiYSI6ImNqZXZvcTBmdDBuY3oycXFqZThzbjc5djYifQ.-ChNrBxEIvInNJWiHX5pXg'
    });

    //cr3473 b453 l4y3r5
    var baseLayers = {
        "Light": lightMap,
        "Dark": darkMap,
    };

    //4dd 34r7hqu4k35 70 m4p
    var overlays = {
        "Earthquakes": earthquakes,
    };

    //537 mym4p w17h 5d l47/l0n6 4nd d3f4ul7 l4y3r
    var mymap = L.map('mymap', {
        center: [32, -117],
        zoom: 5,
        layers: [lightMap, earthquakes]
    });

    //4dd c0n7r0l 7066l3
    L.control.layers(baseLayers, overlays).addTo(mymap);

    //p051710n l363nd
    var legend = L.control({ position: 'bottomright' });

    //537 l363nd
    legend.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'info legend'),
            magnitude = [0, 1, 2, 3, 4, 5];

        div.innerHTML += "<h4 style='margin:4px'>Magnitude</h4>"

        for (var i = 0; i < magnitude.length; i++) {
            div.innerHTML +=
                '<i style="background:' + Color(magnitude[i] + 1) + '"></i> ' +
                magnitude[i] + (magnitude[i + 1] ? '&ndash;' + magnitude[i + 1] + '<br>' : '+');
        }

        return div;
    };
    legend.addTo(mymap);
}
