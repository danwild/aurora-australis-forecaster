# aurora-australis-forecaster

<strong>Note:</strong> this project is a work in progress.<br/>
A cross-platform application for aggregating and visualising real-time Aurora Australis forecast data.


## Core features/requirements
<ul>
	<li>Provide simple forecast/status updates for geophysically-illiterate users; while also enabling advanced users to 'drill-down' to perform more detailed analysis.</li>
	<li>Define the major impacting factors, and develop an aggregated metric scale to roughly quantify potential aurora quality at a given time and location.</li>
	<li>Leverage best available data.</li>
	<li>App to be delivered via the web, iOS and Android.</li>
	<li>App free for anybody to use, and code is open source.</li>
	<li>...</li>
</ul>

## Wishlist features
<ul>
	<li>Allow power users to adjust metric weightings</li>
	<li>Alert system, e.g. let me know if there's a forecast <code> >= x </code> score for location <code>y</code></li>
	<li>FAQ</li>
	<li>Gallery</li>
	<li>...</li>
</ul>


## Potential metrics (roughly high to low weighting)
<ul>
	<li>Kp Index (probably http://www.swpc.noaa.gov/)</li>
	<li>Solar Winds (Bz, Speed, Density: http://www.swpc.noaa.gov/)</li>
	<li>Localised cloud cover (?)</li>
	<li>Moonlight, or light pollution (?)</li>
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
	<li>alon:ol3</li>
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
	The best bit of code is the bit you don't have to write yourself ;)</li>
	<li>...</li>
</ul>	


## Notes/useful stuff for Meteor development

https://atmospherejs.com/ meteor pkgs<br/>
http://bootsnipp.com/ UI snippets for bootstrap<br/>
http://www.favicon-generator.org/ app icon generator for web, ios and android<br/>
 
 
