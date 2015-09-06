var buttons  = require('sdk/ui/button/action'),
	tabs 	 = require("sdk/tabs"),
	self 	 = require("sdk/self"),
	pageMod  = require("sdk/page-mod"),
	prefs 	 = require("sdk/simple-prefs").prefs,

	settings = {},

	allowed_settings = [ 'user_command_path', 'shortcut', 'base_path', 'autoload' ],
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
					if(prefs.autoload)
					{
						tabs.open( 'https://' + base_path.replace(/^https?:\/\//, '') );
					}
					else
					{
					  tabs.activeTab.attach( { 
					  		contentScriptFile: 		self.data.url('inject.js'),  
					  		contentScriptOptions:  	modOptions
					  	});
					}
				}
	});

require("sdk/simple-prefs")
	.on('base_path', function(prefName)
	{
		settings[prefName] = base_path = prefs.base_path;
		resetMod();
	})
	.on('user_command_path', function(prefName)
	{
		settings[prefName] = prefs.user_command_path;
		resetMod();
	})
	.on('autoload', function(prefName)
	{
		if(prefs.autoload) 	initMod();
		else 				mod.destroy();
	})
	.on('shortcut', function(prefName)
	{
		settings[prefName] = prefs.shortcut;
		resetMod();
	});

//tabs.open( 'http://www.google.com' );

// promote settings
settings.loaded_from = 'ff-extension';
allowed_settings.forEach(function(val)
{  
	if( val in prefs )
	{
		settings[val] = prefs[val];
	}
});

var modOptions = {
	        		urls: 	 	[ "/js/bookmarklet.min.js" ],
	        		settings: 	settings
	    		};

function initMod()
{
	// inject scripts
	mod = pageMod.PageMod({
	  	include: 				"*",
	  	contentScriptFile: 		self.data.url('inject.js'),
		contentScriptOptions:  	modOptions
	});
}
function resetMod()
{
	mod.destroy();
	initMod();
}

if(prefs.autoload) initMod();