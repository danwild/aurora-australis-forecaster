

Template.footer.onRendered(function() {


	// our time
	function startTime() {
		var today = new Date();
		var h = today.getHours();
		var m = today.getMinutes();
		var s = today.getSeconds();

		var D = today.getDate();
		var M = today.getMonth();
		var Y = today.getFullYear();

		m = checkTime(m);
		s = checkTime(s);
		$("#our-time").html(new Date(Y, M, D, h, m, s).toString().split('GMT')[0]);
		$("#utc-time").html(new Date(
			today.getUTCFullYear(),
			today.getUTCMonth(),
			today.getUTCDate(),
			today.getUTCHours(),
			today.getUTCMinutes(),
			today.getUTCSeconds()
		).toString().split('GMT')[0]);

		//$("#utc-time").html(Date.UTC(Y, M, D, h, m, s));

		var t = setTimeout(startTime, 500);
	}

	function checkTime(i) {
		if (i < 10) {i = "0" + i}; // add zero in front of numbers < 10
		return i;
	}

	startTime();
	$('[data-toggle="tooltip"]').tooltip();

});


