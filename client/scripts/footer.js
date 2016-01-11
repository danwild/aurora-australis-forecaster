

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

	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	ga('create', 'UA-71743728-1', 'auto');
	ga('send', 'pageview');

	$('[data-toggle="tooltip"]').tooltip();

});


