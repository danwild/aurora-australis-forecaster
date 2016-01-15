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

## Planned features

- Responsive layout for mobile (this should already be working, need to investigate why not..)
- Time series plot of real-time solar wind data from L1 (ACE/DSCOVR).
- A scoring model to emulate human interpretation of solar wind data (if a few solar wind variables line up,
	 outlook is good etc.), should use some interpolation to smooth null values and brief fluctuations that 
	 may trigger give false positives.
- Location search box (support lat/lon search)
- TIPS: Write copy/provide resources/links
- FAQ: Write copy/provide resources/links
- Leverage best available data.
- App to be delivered via the web, iOS and Android.
- App free for anybody to use, and code is open source for the Aurora Chaser community.



## Wishlist features

- An intelligent alert system that doesn’t cost an arm and a leg
- IIS Tracker (boost morale on uneventful nights..)

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
 
 
