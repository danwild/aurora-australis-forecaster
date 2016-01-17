# aurora-australis-forecaster


------------------------------------------------------------------------------------------------

<p><strong>Note:</strong> this project is a work in progress.<br/>
A development/proof of concept version is viewable here: http://aurora.nawth.io/ however
it may stop working at anytime, or display wildly inaccurate data without any notice. Use with caution until advised otherwise.
</p>

------------------------------------------------------------------------------------------------

A cross-platform application for aggregating and visualising real-time Aurora Australis forecast data.

Predicting the weather on Earth is still not an exact science, and this becomes more evident when we try to 
go beyond our own atmosphere - a limitation all "Aurora Chasers" must begrudgingly accept. 

With this in mind; this project sets out with the intent to provide tools to identify when 
there is a substantially elevated probability of seeing an Aurora.

As any predictive model is _only as good as the underlying data_, we will focus on 
identifying and communicating the things we know with a reasonable degree of confidence.

## Current features

####Charts/Data
- Real-time solar wind data feeds from ACE/DSCOVR satelites
- Collection of live, and forecast charts from NOAA, BOM etc. (TAS magnetometers, 6hr PLASMAG etc.)
- Generate animations of Ovation and CME forecasts etc *(prrof of concept only, planned refactor)
- UTC and local time display *(local time fixed to TAS, we should set by location)

####Maps
- Basemaps (topo, street, satellite)
- Light pollution map (2015)
- Dynamic South Pole (data till 2020)
- Live ISS tracker
- Interactive viewing locations map

####Weather
- Widget to show weather based on location
- Widget to show moon phase info based on location
- Animated satellite imagery map from BOM (national cloud cover)
- Cressy Cam Video feed

####Raw data
- Todo

####Raw data
- Todo

####Raw data
- Todo

## Planned features

- Time series plot of real-time solar wind data from L1 (ACE/DSCOVR).
- A scoring model to emulate human interpretation of solar wind data (if a few solar wind variables line up,
	 outlook is good etc.), should use some interpolation to smooth null values and brief fluctuations that 
	 may trigger give false positives.
- Location search box (support lat/lon search)
- TIPS: Write copy/provide resources/links
- FAQ: Write copy/provide resources/links
- An intelligent alert system that doesn’t cost an arm and a leg
- Leverage best available data.
- App to be delivered via the web, iOS and Android.
- Responsive layout for mobile (this should already be working, need to investigate why not..)
- App free for anybody to use, and code is open source for the Aurora Chaser community.


## Community suggested features

- Contextual data based on locations "as a user I want to see magnetometer/weather etc from my area, or allow me
to look at data for other locations"
- User configurable dashboard "as a user I want to be able to modify the dashboard so I only see the data 
that I'm most interested in"
- Night Vision mode "as a user I'd like to be able to enable a NV mode, to change the interface colours to reduce 
negative impacts on my night vision in the field"



## Technical To-do's

- Switch to AngularJS for ViewModel, things are getting messy.
- Switch to stable txt services or press on with experimental?
- ISS - we should poll service from server-side and push out to client.
- gifshot, scale interval to img count..? Also need pause. This whole thing needs rethinking (also: we should fetch first pic of each animation).
- move REST service polling to server - run code on server, see if we can live update gauges etc.
- alerts..
- pull charts from config


## Deployment notes
Currently deployed to AWS EC2 instance using <a href="https://github.com/arunoda/meteor-up">Meteor Up</a>.<br/>
Some basic starter notes here: <a href="http://sergelobatch.com/slog/2015/4/10/using-mup/">http://sergelobatch.com/slog/2015/4/10/using-mup/</a>

With AWS and `mup.json` configured:

```bash
$ mup setup 
$ mup deploy
```

If you get deployment errors, check the logs `$ mup logs -f`


## Dependencies

Meteor Packages:

- twbs:bootstrap
- iron:router
- http

Cordova Packages:

- org.apache.cordova.inappbrowser@1.1.1
- cordova:org.apache.cordova.core.device@1.1.0

Other goodies:

- Google Fonts
- FontAwesome Icons
- D3JS


## Interested/want to help?
I'm new to whole aurora scene and am simply building this as a way to learn more; I'd greatly appreciate: 
- <strong>Feature requests</strong> - or suggestions of things you think would be useful.
- <strong>Data</strong> - specifically any live or regularly updated data feeds that would be relevant.
- <strong>Help</strong> - if you're a developer and are keen to get involved drop me a line or shoot me a pull request. 
	

## Notes/useful stuff for Meteor development

- https://atmospherejs.com/ meteor pkgs
- http://bootsnipp.com/ UI snippets for bootstrap
- http://www.favicon-generator.org/ app icon generator for web, ios and android
 
 
