Router.configure({

	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound'
});

Router.route("/", {
	name: "chartsTemplate",
	data: function(){
		return {
			activeTemplate: 'charts'
		}
	}
});



Router.route("/map", {
	name: "mapTemplate",
	data: function(){
		return {
			activeTemplate: 'map'
		}
	}
});

Router.route("/raw", {
	name: "rawTemplate",
	data: function(){
		return {
			activeTemplate: 'raw'
		}
	}
});

Router.route("/tips", {
	name: "tipsTemplate",
	data: function(){
		return {
			activeTemplate: 'tips'
		}
	}
});

Router.route("/faq", {
	name: "faqTemplate",
	data: function(){
		return {
			activeTemplate: 'faq'
		}
	}
});