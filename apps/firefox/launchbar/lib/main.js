var buttons  = require('sdk/ui/button/action'),
	tabs 	 = require("sdk/tabs"),
	self 	 = require("sdk/self"),
	pageMod  = require("sdk/page-mod"),
	prefs 	 = require("sdk/simple-prefs").prefs,

	settings = {},

	allowed_settings = [ 'user_command_path', 'shortcut', 'base_path' ],
	base_path = prefs.base_path || '//danborufka.github.io/cdn/launchbar-js',

	mod,

 	button = buttons.ActionButton({
  	
	  	id: 	"launchbar-init",
	  	label: 	"Start Launchbar",
		icon: 	{
		  		  "16": "./icon-16.png",
		  		  "32": "./icon-32.png",
		  		  "64": "./icon-64.png"
		  		},
	  onClick: 	function(state) 
				{
				  tabs.open( base_path );
				}
	});

require("sdk/simple-prefs").on('base_path', function(prefName)
{
	settings[prefName] = base_path = prefs.base_path;
	mod.destroy();
	initMod();
});

tabs
	.open( 'http://www.google.com' );

// promote settings
settings.loaded_from = 'ff-extension';
allowed_settings.forEach(function(val)
{  
	if( val in prefs )
	{
		settings[val] = prefs[val];
	}
});

function initMod()
{
	// inject scripts
	mod = pageMod.PageMod({
	  	include: 				"*",
	  	contentScriptFile: 		self.data.url('inject.js'),
		contentScriptOptions: 
		{
	        urls: 	[	"https://code.jquery.com/jquery-2.1.4.min.js",
	            		"/js/bookmarklet.min.js"
	        		],
	        settings: settings
	    }
	});
}
initMod();