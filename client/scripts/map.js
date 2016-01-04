
// ol extent [minX, minY, maxX, maxY]
var targetExtent = [110, -46, 159, -26.3];

var headVisible = false;

Template.mapTemplate.helpers({

	toggleDirection: function(){
		return (this.headVisible) ? "up" : "down";
	}

});

Template.mapTemplate.events({

	"click .page-header-toggle": function(){

		headVisible = !headVisible;

		if(headVisible){
			$(".page-header .content").show();
		}
		else {
			$(".page-header .content").hide();
		}
	}

});

Template.mapTemplate.onRendered(function() {

	var targetExtent = [110, -46, 159, -26.3];

	$(document).ready(function() {

		// lat lon display
		var mousePositionControl = new ol.control.MousePosition({
			coordinateFormat: ol.coordinate.createStringXY(2),
			projection: 'EPSG:4326',
			// comment the following two lines to have the mouse position
			// be placed within the map.
			className: 'custom-mouse-position',
			target: document.getElementById('mouse-position'),
			undefinedHTML: '&nbsp;'
		});

		var map = new ol.Map({
			controls: ol.control.defaults({
				attributionOptions: ({
					collapsible: true
				})
			}).extend([mousePositionControl]),
			layers: [
				new ol.layer.Tile({
					source: new ol.source.MapQuest({layer: 'sat'})
				})
			],
			target: 'map',
			view: new ol.View({
				center: ol.proj.fromLonLat([146.47, -40]),
				zoom: 5
			})
		});

		$('[data-toggle="tooltip"]').tooltip();

	});

});


