Router.configure({

	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound'
});

//Router.route("/", {
//	name: "chartsTemplate",
//	data: function(){
//		return {
//			activeTemplate: 'charts'
//		}
//	},
//	waitOn: function(){
//		return [
//			IRLibLoader.load("https://www.google.com/jsapi?autoload={'modules':[{'name':'visualization','version':'1.1','packages':['gauge']}]}")
//			//, IRLibLoader.load("example.js") can be array
//		]
//	}
//});

Router.map( function () {
	this.route('charts',{
		name: "chartsTemplate",
		data: function(){
			return {
				activeTemplate: 'charts'
			}
		}

		//,
		//waitOn: function(){
		//	return [
		//		IRLibLoader.load("vendor/d3.v3.min.js"),
		//		IRLibLoader.load("vendor/gauge.js")
		//	]
		//}
	});
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