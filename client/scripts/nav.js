var pageLabels = {
	"charts": "Forecast Charts",
	"map": "Aurora Forecast Map",
	"weather": "Weather",
	"raw": "Raw Data Feeds",
	"tips": "Aurora Tips",
	"faq": "Aurora FAQ"
};

Template.nav.helpers({

	isActivePage: function (page, activeTemplate) {
		return page == activeTemplate;
	},

	getLabel: function(page){
		return pageLabels[page];
	}
});


