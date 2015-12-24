
Template.homeTemplate.onRendered(function() {

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
					collapsible: false
				})
			}).extend([mousePositionControl]),
			layers: [
				new ol.layer.Tile({
					source: new ol.source.MapQuest({layer: 'sat'})
				})
			],
			target: 'map',
			view: new ol.View({
				center: ol.proj.fromLonLat([135, -37]),
				zoom: 5
			})
		});

	});

});
