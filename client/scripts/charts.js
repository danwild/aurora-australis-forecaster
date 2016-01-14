
Template.chartsTemplate.helpers({

	eg: function(){
		return false;
	}
});

Template.chartsTemplate.events({

	"click .animated-image-panel": function(elem){
		initAnimation(elem);
	}

});

function initGauges(){

	var gauges = [];

	function createGauge(config) {
		gauges[config.name] = new Gauge(config.name + "GaugeContainer", config);
		gauges[config.name].render();
	}

	function updateGauge(key, value) {
		gauges[key].redraw(value);
	}

	function updateGauges(init){

		// BZ (MAG)
		HTTP.call( 'GET', 'http://aurora.nawth.io:7000/mag', {}, function( error, magResponse ) {

			if (error) {
				console.log(error);
			} else {

				var target = "bz";

				if(init) createGauge({
					size: 250,
					name: target,
					label: "Bz",
					min: -20,
					max: 20,
					yellowZones: [{
						from: -10,
						to: 0
					}],
					redZones: [{
						from: -20,
						to: -10
					}],
					minorTicks: 5
				});

				var value;
				if(!magResponse.data || !magResponse.data.hasOwnProperty('length')){
					setError(target);
					value = -999.9;
				}
				else {
					value = +magResponse.data[magResponse.data.length -1][3];
				}

				if(!hasErrors(target, value, -999.9)){
					updateGauge(target, value);
				}
			}
		});

		// Speed, Density (PLASMA)
		HTTP.call( 'GET', 'http://aurora.nawth.io:7000/plasma', {}, function( error, plasmaResponse ) {
			if (error) {
				console.log(error);
			} else {
				var target = "speed";

				if(init) createGauge({
					size: 250,
					name: target,
					label: "Speed",
					min: 200,
					max: 1000,
					yellowZones: [{
						from: 450,
						to: 600
					}],
					redZones: [{
						from: 600,
						to: 1000
					}],
					minorTicks: 5
				});

				var value;
				if(!plasmaResponse.data || !plasmaResponse.data.hasOwnProperty('length')){
					setError(target);
					value = -9999.9;
				}
				else {
					value = +plasmaResponse.data[plasmaResponse.data.length -1][2];
				}

				if(!hasErrors(target, value, -9999.9)){
					updateGauge(target, value);
				}

				var target = "density";

				if(init) createGauge({
					size: 250,
					name: target,
					label: "Density",
					min: 0,
					max: 20,
					yellowZones: [{
						from: 10,
						to: 15
					}],
					redZones: [{
						from: 15,
						to: 20
					}],
					minorTicks: 5
				});

				var value;
				if(!plasmaResponse.data || !plasmaResponse.data.hasOwnProperty('length')){
					setError(target);
					value = -9999.9;
				}
				else {
					value = +plasmaResponse.data[plasmaResponse.data.length -1][1];
				}

				if(!hasErrors(target, value, -9999.9)){
					updateGauge(target, value);
				}
			}
		});

		// KP
		HTTP.call( 'GET', 'http://aurora.nawth.io:7000/wing-kp', {}, function( error, wingKpResponse ) {
			if (error) {
				console.log(error);
			} else {

				var target = "kp";
				if(init) createGauge({
					size: 250,
					name: target,
					label: "Wing Kp",
					min: 0,
					max: 9,
					yellowZones: [{
						from: 4,
						to: 6
					}],
					redZones: [{
						from: 6,
						to: 9
					}],
					minorTicks: 5
				});

				if(!wingKpResponse.data.hasOwnProperty('length')){
					setError(target);
				}
				var value = +wingKpResponse.data[wingKpResponse.data.length -1][8];
				if(!hasErrors(target, value, -1)){
					updateGauge("kp", value);
				}
			}
		});
		console.log("gauges updated!");
	}

	updateGauges(true);
	getAlerts();
	Meteor.setInterval(updateGauges, 60000);
	Meteor.setInterval(getAlerts, 60000);

	function hasErrors(target, value, errValue){

		console.log(value + " == "+errValue);
		if(value == errValue || isNaN(value) || value == null || value == false){
			setError(target);
			return true;
		}
		else {
			$("#"+ target + "GaugeOffline").hide();
			return false;
		}
	}

	function setError(target){
		$("#"+ target + "GaugeOffline").fadeIn();
	}
}

function getAlerts(){

	HTTP.call( 'GET', 'http://services.swpc.noaa.gov/products/alerts.json', {}, function(error, response) {

		if(error) {
			$("#noaa-alert .alert-message").text("Alerts from NOAA failed, you can try here: http://www.swpc.noaa.gov/");
		}
		else if(response.data && response.data.length > 0){
			$("#noaa-alert .alert-time").text("Latest Alert: "+ response.data[0].issue_datetime + " (UTC)");
			$("#noaa-alert .alert-message").text(response.data[0].message);
		}

		$("#noaa-alert").fadeIn();
	});
}

function initAnimation(elem){

	// check init
	if($(elem.currentTarget).find('i.fa-play').length == 0){
		return;
	}

	var configFile = $(elem.currentTarget).data("target-config");
	var urlPrefix = $(elem.currentTarget).data("url-prefix");
	var maxLength = $(elem.currentTarget).data("max");

	// loading
	$(elem.currentTarget).find('i').removeClass('fa-play');
	$(elem.currentTarget).find('i').addClass('fa-cog fa-spin');
	$(elem.currentTarget).find('.load-progress').text("loading imagery list..");

	//$.getScript("/js/vendor/gifshot.min.js", function() {

		var baseUrl = "http://services.swpc.noaa.gov";

		HTTP.call( 'GET', baseUrl + urlPrefix + '/products/animations/' + configFile +'.json', {}, function(error, response) {

			var images = [];

			// don't bite off more than we can chew..
			if(response.data.length > maxLength){
				response.data = response.data.slice((response.data.length - maxLength), response.data.length);
			}

			$(elem.currentTarget).find('.load-progress').text("wrestling "+response.data.length+" images..");

			for(var i = 0; i < response.data.length; i++){
				images.push(baseUrl + urlPrefix + response.data[i].url);
			}

			console.log("images length: "+ images.length);

			gifshot.createGIF({
				images: images,
				interval: 0.1,
				gifWidth: 468,
				gifHeight: 468,
				progressCallback: function(captureProgress) {
					console.log("captureProgress "+ captureProgress);
					$(elem.currentTarget).find('.load-progress').text((captureProgress * 100).toFixed(1) +"%");
				}
			}, function (obj) {
				if (!obj.error) {
					var image = obj.image, animatedImage = document.createElement('img');
					animatedImage.src = image;

					console.log("loaded!");

					// done
					$(elem.currentTarget).find('img').hide();
					$(elem.currentTarget).find('.load-progress').text('');
					$(elem.currentTarget).find('i').removeClass('fa-cog fa-spin');
					$(elem.currentTarget).find('i').removeClass('fa-pause');

					// bombs away
					$("#"+configFile+ "-animation").html(animatedImage);
				}
			});
		});

	 //});
}

Template.chartsTemplate.onRendered(function() {

	initGauges();

	$('[data-toggle="tooltip"]').tooltip();

});


