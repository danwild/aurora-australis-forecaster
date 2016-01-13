
// ol extent [minX, minY, maxX, maxY]
var targetExtent = [110, -46, 159, -26.3];
var map, mapNasam, bounds, issMarker, updatePosition;

Template.mapTemplate.helpers({});
Template.mapTemplate.events({

	"click .map-toggle": function(elem){
		toggleMap(elem);
	}

});

function toggleMap(elem){

	if($(elem.currentTarget).data("map") == "map"){
		console.log("show map");
		$("#map-nasa").hide();
		$("#map").show();

		setTimeout(function(){
			map.invalidateSize();
			map.fitBounds(bounds);
		}, 1000);
	}
	else {
		$("#map").hide();
		$("#map-nasa").show();

		setTimeout(function(){
			mapNasa.invalidateSize();
            mapNasa.fitBounds(bounds);
		}, 1000);
	}

	// set button active
	$(".map-toggle").removeClass('btn-primary');
	$(".map-toggle").addClass('btn-default');
	$(elem.currentTarget).addClass('btn-primary');
}

var interrupt = false;

function startIss(){

    console.log("startIss...");
    Meteor.clearTimeout(updatePosition);

    // GET INITIAL POS
    $.ajax({
        type: 'POST',
        url: "http://api.open-notify.org/iss-now.json?",
        dataType: 'jsonp',
        success: function (data) {
            issMarker.moveTo([data.iss_position.latitude, data.iss_position.longitude], 4000);
            map.panTo([data.iss_position.latitude, data.iss_position.longitude]);
            issMarker.start();
            Meteor.setTimeout(updatePosition, 3000);
        },
        error: function(err){
            alert("ISS location service is down, sorry.");
        }
    });


    updatePosition = function () {

        $.ajax({
            type: 'POST',
            url: "http://api.open-notify.org/iss-now.json?",
            dataType: 'jsonp',
            success: function (data) {

                // sometimes needs a jumpstart if we get a slow request
                // and the animation runs out of positions
                if(issMarker.isEnded()){
                    startIss();
                }
                
                issMarker.moveTo([data.iss_position.latitude, data.iss_position.longitude], 4000);

                if(!interrupt){
                    Meteor.setTimeout(updatePosition, 3000);
                }
            },
            error: function(err){
                issMarker.stop();
                alert("ISS location service is down, sorry.");
                console.log(err);
                Meteor.clearTimeout(updatePosition);
            }
        });

    };

}

function stopIss(){
    console.log("stopIss");
    issMarker.stop();
    Meteor.clearTimeout(updatePosition);
    interrupt = true;
}

Template.mapTemplate.onRendered(function() {

	$(document).ready(function() {

		$.getScript("/js/vendor/leaflet.js", function() {
			$.getScript("/js/vendor/proj4.js", function() {
				$.getScript("/js/vendor/proj4leaflet.js", function() {
                    $.getScript("/js/vendor/MovingMarker.js", function() {


                        // DEFINE GIBS CRS & ALL OUR LAYERS
                        var EPSG4326 = new L.Proj.CRS(
                            "EPSG:4326",
                            "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs", {
                                origin: [-180, 90],
                                resolutions: [
                                    0.5625,
                                    0.28125,
                                    0.140625,
                                    0.0703125,
                                    0.03515625,
                                    0.017578125,
                                    0.0087890625,
                                    0.00439453125,
                                    0.002197265625
                                ],
                                // Values are x and y here instead of lat and long elsewhere.
                                bounds: [
                                    [-180, -90],
                                    [180, 90]
                                ]
                            }
                        );

                        var template =
                            "//map1{s}.vis.earthdata.nasa.gov/wmts-geo/" +
                            "{layer}/default/{time}/{tileMatrixSet}/{z}/{y}/{x}.jpg";

                        // TODAY
                        var today = new Date();
                        var utcToday = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
                        var D = utcToday.getDate();
                        var M = utcToday.getMonth() +1;
                        var Y = utcToday.getFullYear();
                        M = checkTime(M);
                        D = checkTime(D);

                        // YESTERDAY
                        var yesterday = new Date(today);
                        yesterday.setDate(today.getDate() - 1);
                        var utcYesterday = new Date(Date.UTC(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate()));
                        var yD = utcYesterday.getDate();
                        var yM = utcYesterday.getMonth() +1;
                        var yY = utcYesterday.getFullYear();
                        yM = checkTime(yM);
                        yD = checkTime(yD);

                        function checkTime(i) {
                            if (i < 10) {i = "0" + i}; // add zero in front of numbers < 10
                            return i;
                        }

                        // YYYY-MM-DD
                        var dateTime = (Y+"-"+M+"-"+D);
                        var yesterdayDateTime = (yY+"-"+yM+"-"+yD);

                        var nasaLayer = L.tileLayer(template, {
                            layer: "MODIS_Terra_CorrectedReflectance_TrueColor",
                            tileMatrixSet: "EPSG4326_250m",
                            time: dateTime,
                            tileSize: 512,
                            subdomains: "abc",
                            noWrap: true,
                            continuousWorld: true,
                            // Prevent Leaflet from retrieving non-existent tiles on the borders.
                            bounds: [
                                [-89.9999, -179.9999],
                                [89.9999, 179.9999]
                            ],
                            attribution:
                            "<a href='https://wiki.earthdata.nasa.gov/display/GIBS'>" +
                            "NASA EOSDIS GIBS</a>&nbsp;&nbsp;&nbsp;" +
                            "<a href='https://github.com/nasa-gibs/web-examples/blob/release/examples/leaflet/geographic-epsg4326.js'>" +
                            "View Source" +
                            "</a>"
                        });

                        var nasaLayerYesterday = L.tileLayer(template, {
                            layer: "MODIS_Terra_CorrectedReflectance_TrueColor",
                            tileMatrixSet: "EPSG4326_250m",
                            time: yesterdayDateTime,
                            tileSize: 512,
                            subdomains: "abc",
                            noWrap: true,
                            continuousWorld: true,
                            // Prevent Leaflet from retrieving non-existent tiles on the borders.
                            bounds: [
                                [-89.9999, -179.9999],
                                [89.9999, 179.9999]
                            ],
                            attribution:
                            "<a href='https://wiki.earthdata.nasa.gov/display/GIBS'>" +
                            "NASA EOSDIS GIBS</a>&nbsp;&nbsp;&nbsp;" +
                            "<a href='https://github.com/nasa-gibs/web-examples/blob/release/examples/leaflet/geographic-epsg4326.js'>" +
                            "View Source" +
                            "</a>"
                        });

                        var Esri_WorldImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, ' +
                            'AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                        });
                        var Esri_WorldTopoMap = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
                            attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, ' +
                            'NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'

                        });
                        var Esri_WorldStreetMap = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
                            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, ' +
                            'NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
                        });
                        var Esri_WorldGrayCanvas = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
                            attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
                            maxZoom: 16
                        });
                        var lightPollution = L.tileLayer.wms("http://www2.lightpollutionmap.info/geoserver/gwc/service/wms", {
                            layers: 'PostGIS:VIIRS_2015',
                            format: 'image/png',
                            transparent: true,
                            opacity: 0.4
                        });

                        // ISS
                        var issGroup = new L.LayerGroup();

                        var issIcon = L.divIcon({
                            className: 'font-awesome-leaflet-icon',
                            html: '<i class="fa fa-space-shuttle"></i>'
                        });

                        //L.marker([50.505, 30.57], {icon: issIcon}).bindPopup('This is the ISS').addTo(issGroup);

                        issMarker = L.Marker.movingMarker([[-37, -133], [-37, -134]],
                            [10], {icon: issIcon}).addTo(issGroup);



                        var baseLayers = {
                            "Streets": Esri_WorldStreetMap,
                            "Topography": Esri_WorldTopoMap,
                            "Canvas": Esri_WorldGrayCanvas,
                            "Satellite": Esri_WorldImagery
                        };

                        var overlays = {
                            "Light Pollution": lightPollution,
                            "ISS Location": issGroup
                        };

                        var southWest = L.latLng(-46, 100);
                        var	northEast = L.latLng(-26.3, 159);
                        bounds = L.latLngBounds(southWest, northEast);

                        // MAP 1
                        map = L.map('map', {
                            center: [-36, -135.99],
                            zoom: 2,
                            layers: [
                                Esri_WorldTopoMap,
                                Esri_WorldGrayCanvas,
                                Esri_WorldTopoMap,
                                Esri_WorldImagery
                            ]
                        });

                        map.fitBounds(bounds);
                        L.control.layers(baseLayers, overlays).addTo(map);

                        // listen for ISS add/remove
                        map.on('overlayadd', function(e) {
                            if(e.layer == issGroup){
                                startIss();
                            }
                        });

                        map.on('overlayremove', function(e) {
                            if(e.layer == issGroup){
                                stopIss();
                            }
                        });

                        // MAP NASA
                        var nasaLayers = {
                            "Today (may not be captured yet)": nasaLayer,
                            "Yesterday": nasaLayerYesterday
                        };
                        mapNasa = L.map('map-nasa', {
                            center: [-36, -135.99],
                            zoom: 2,
                            crs: EPSG4326,
                            layers: [nasaLayer, nasaLayerYesterday]
                        });

                        mapNasa.fitBounds(bounds);
                        L.control.layers(nasaLayers).addTo(mapNasa);

                        $(".leaflet-control-layers-toggle").html("<i class='fa fa-cog' id='map-layers-trigger'></i>");

                    });

                    $('[data-toggle="tooltip"]').tooltip();

                });
			});
		});
	});
});


