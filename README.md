# aurora-australis-forecaster


------------------------------------------------------------------------------------------------

<p><strong>Note:</strong> this project is a work in progress.<br/>
A development/prototype version is viewable here: http://aurora.nawth.io/ however
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

## Core features/requirements
<ul>
	<li>Focus on things we know with (some) confidence and provide simple reference information for geophysically-illiterate users, for example: 
		<ul>
	        <li>"there was substantial earth-directed CME flare today that may arrive approx 1-3 days"; or</li>
	        <li>"Solar wind activity recorded 1 min ago indicates that an Aurora may be imminent" </li>
	    </ul>	
	</li>    
	<li>Also enable advanced users to 'drill-down' to perform more detailed analysis.</li>
	<li>Some kind of user configurable solar wind alert feature for ACE feeds, so we don't need to keep setting alarms through the night. (e.g. only wake me up if Bz is x, Bx is y and speed is z)</li>
	<li>Define the major impacting factors, and develop an <a href="https://github.com/danwild/aurora-australis-forecaster/wiki/Forecast-Calculation-Methodology">aggregated metric scale</a> to roughly quantify potential aurora quality</li>
	<li>Provide other useful spatial tools - light pollution, cloud cover maps?</li>
	<li>Leverage best available data.</li>
	<li>App to be delivered via the web, iOS and Android.</li>
	<li>App free for anybody to use, and code is open source for the Aurora Chaser community.</li>
	<li>...</li>
</ul>


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
<ul>
	<li>twbs:bootstrap</li>
	<li>iron:router</li>
	<li>http</li>
	<li>...</li>
</ul>	
Other goodies:
<ul>
	<li>Google Fonts</li>
	<li>FontAwesome Icons</li>
	<li>D3JS</li>
	<li>...</li>
</ul>


## Interested/want to help?
I'm new to whole aurora scene and am simply building this as a way to learn more; I'd greatly appreciate: 
<ul>
	<li><strong>Feature requests</strong> - or suggestions of things you think would be useful.</li>
	<li><strong>Data</strong> - specifically any live or regularly updated data feeds that would be relevant.</li>
	<li><strong>Help</strong> - if you're a developer and are keen to get involved drop me a line or shoot me a pull request. 
</ul>	


## Notes/useful stuff for Meteor development

https://atmospherejs.com/ meteor pkgs<br/>
http://bootsnipp.com/ UI snippets for bootstrap<br/>
http://www.favicon-generator.org/ app icon generator for web, ios and android<br/>
 
 
