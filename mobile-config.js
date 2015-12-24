// This section sets up some basic app metadata,
// the entire section is optional.
App.info({
	id: 'io.nawth.aurora',
	name: 'Aurora Australis',
	description: 'Aggregates and visualises real-time Aurora Australis forecast data',
	author: 'Nawth',
	email: 'dan@nawth.io',
	website: 'http://aurora.nawth.io'
});

// Set up resources such as icons and launch screens.
App.icons({
	'iphone': 'public/images/icons/apple-icon-60x60.png',
	'iphone_2x': 'public/images/icons/apple-icon-120x120.png'
	// ... more screen sizes and platforms ...
});

//App.launchScreens({
//	'iphone': 'splash/Default~iphone.png',
//	'iphone_2x': 'splash/Default@2x~iphone.png',
//	// ... more screen sizes and platforms ...
//});

// Set PhoneGap/Cordova preferences
App.setPreference('BackgroundColor', '0xff0000ff');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'default');
App.setPreference('Orientation', 'all', 'ios');

// Pass preferences for a particular PhoneGap/Cordova plugin
//App.configurePlugin('com.phonegap.plugins.facebookconnect', {
//	APP_ID: '1234567890',
//	API_KEY: 'supersecretapikey'
//});

App.accessRule('*');