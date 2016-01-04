
Template.chartsTemplate.helpers({

	eg: function(){
		return false;
	}

});

Template.chartsTemplate.events({

	"click .class-eg": function(){

	}

});

Template.chartsTemplate.onRendered(function() {


	// bit ugly chaining these, but on waitOn giving mixed results atm
	$.getScript("/js/vendor/d3.v3.min.js", function() {

		$.getScript("/js/vendor/gauge.js", function() {


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

						if(!magResponse.data.hasOwnProperty('length')){
							setError(target);
						}

						var value = +magResponse.data[magResponse.data.length -1][3];
						updateGauge(target, value);

						checkErrors(target, value, -999.9);
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

						if(!plasmaResponse.data.hasOwnProperty('length')){
							setError(target);
						}

						var value = +plasmaResponse.data[plasmaResponse.data.length -1][2];
						checkErrors(target, value, -9999.9);
						updateGauge(target, value);

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

						var value = +plasmaResponse.data[plasmaResponse.data.length -1][1];
						checkErrors(target, value, -9999.9);
						updateGauge(target, value);
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
						checkErrors(target, value, -1);
						updateGauge("kp", value);
					}
				});

				console.log("gauges updated!");
			}

			updateGauges(true);
			setInterval(updateGauges, 60000);

			function checkErrors(target, value, errValue){

				console.log(value + " == "+errValue);

				if(value == errValue || value == null || value == false){
					$("#"+ target + "GaugeOffline").fadeIn();
				}
				else {
					$("#"+ target + "GaugeOffline").hide();
				}
			}
		});
	});

	$('[data-toggle="tooltip"]').tooltip();



	$.getScript("/js/vendor/gifshot.min.js", function() {

		var baseUrl = "http://services.swpc.noaa.gov";

		HTTP.call( 'GET', 'http://services.swpc.noaa.gov/products/animations/lasco-c2.json', {}, function(error, response) {

			var images = [];

			for(var i = 0; i < response.data.length; i++){
				images.push(baseUrl + response.data[i].url);
			}

			console.log("losco c2 "+ images.length);

			gifshot.createGIF({
				images: images,
				interval: 0.4,
				gifWidth: 500,
				gifHeight: 500,
			}, function (obj) {
				if (!obj.error) {
					var image = obj.image, animatedImage = document.createElement('img');
					animatedImage.src = image;
					$("#lasco-c2").html(animatedImage);
				}
			});
		});

		//HTTP.call( 'GET', 'http://services.swpc.noaa.gov/products/animations/lasco-c3.json', {}, function(error, response) {
		//
		//	var images = [];
		//
		//	for(var i = 0; i < response.data.length; i++){
		//		images.push(baseUrl + response.data[i].url);
		//	}
		//
		//	console.log("losco c3 "+ images.length);
		//
		//	gifshot.createGIF({
		//		images: images,
		//		interval: 0.4,
		//		gifWidth: 500,
		//		gifHeight: 500,
		//	}, function (obj) {
		//		if (!obj.error) {
		//			var image = obj.image, animatedImage = document.createElement('img');
		//			animatedImage.src = image;
		//			$("#lasco-c3").html(animatedImage);
		//		}
		//	});
		//});


	});

});


