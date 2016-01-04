
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

			function createGauge(name, label, min, max) {
				var config =
				{
					size: 250,
					label: label,
					min: undefined != min ? min : 0,
					max: undefined != max ? max : 100,
					minorTicks: 5
				};

				var range = config.max - config.min;
				config.yellowZones = [{from: config.min + range * 0.75, to: config.min + range * 0.9}];
				config.redZones = [{from: config.min + range * 0.9, to: config.max}];

				gauges[name] = new Gauge(name + "GaugeContainer", config);
				gauges[name].render();
			}

			function updateGauge(key, value) {
				gauges[key].redraw(value);
			}

			function getRandomValue(gauge) {
				var overflow = 0; //10;
				return gauge.config.min - overflow + (gauge.config.max - gauge.config.min + overflow * 2) * Math.random();
			}


			function updateGauges(init){

				// BZ (MAG)
				HTTP.call( 'GET', 'http://aurora.nawth.io:7000/mag', {}, function( error, magResponse ) {


					if (error) {
						console.log(error);
					} else {

						var target = "bz";
						if(init) createGauge(target, "Bz", -20, 20);

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
						if(init) createGauge(target, "Speed", 200, 2000);

						if(!plasmaResponse.data.hasOwnProperty('length')){
							setError(target);
						}

						var value = +plasmaResponse.data[plasmaResponse.data.length -1][2];
						checkErrors(target, value, -9999.9);
						updateGauge(target, value);

						var target = "density";
						if(init) createGauge(target, "Density", 0, 20);

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
						if(init) createGauge(target, "Wing Kp", 0, 9);

						if(!wingKpResponse.data.hasOwnProperty('length')){
							setError(target);
						}

						console.log(wingKpResponse);
						console.log(wingKpResponse.data);

						var value = +wingKpResponse.data[wingKpResponse.data.length -1][8];
						console.log("kp is "+ value);

						checkErrors(target, value, -1);
						updateGauge("kp", value);
					}
				});

				console.log("gauges updated!");
			}

			updateGauges(true);

			setInterval(updateGauges, 60000);


			function setError(){

			}

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

});


