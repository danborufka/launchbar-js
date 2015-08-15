var buttons  = require('sdk/ui/button/action'),
	tabs 	 = require("sdk/tabs"),
	pageMod  = require("sdk/page-mod"),
	prefs 	 = require("sdk/simple-prefs").prefs,
	storage  = require("sdk/simple-storage").storage,

	settings = {},

	allowed_settings = [ 'user_command_path', 'shortcut' ],
	base_path = '//danborufka.github.io/cdn/launchbar-js',

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

console.log('init storage', storage);

tabs
	.on('deactivate', function(tab)
	{
		if(tab.url !== 'about:blank' && tab.url.length)
		{
			var worker = tab.attach({
		    	contentScript: "if('LAUNCHBAR_STORAGE' in localStorage)" +	
		    				   "{" + 
		    				   		"self.port.emit('store', JSON.parse(localStorage.LAUNCHBAR_STORAGE));" + 
		    				   		"localStorage.removeItem('LAUNCHBAR_STORAGE');" + 
		    				   "};"
			  });

			worker.port.on("store", function(store) 
			{
				storage.LAUNCHBAR = store;
				console.log('Stored in extension storage.', storage);
			});
		}
	})
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

if(!('LAUNCHBAR' in storage))
{
	storage.LAUNCHBAR = {};
}

// test storage
//storage['ac.dict'] = {'test': 'Something testfully!'};

// inject scripts
pageMod.PageMod({
  include: "*",
  contentScript: 	"var s = document.createElement('script'); s.className = 'lb-injected';" +
  					"s.innerHTML = 'window.LAUNCHBAR = { options:" + JSON.stringify( settings ) + ", storage:" + JSON.stringify( storage.LAUNCHBAR ) + " };';" + 
  					"document.body.appendChild(s);" + 

  					"self.options.urls.forEach(url => {" +
                    "	var script = document.createElement('script');" +
                    "	script.src = url; script.className = 'lb-injected';" +
                    "	document.body.appendChild(script);" +
                  	"}); ",

	contentScriptOptions: 
	{
        urls: 	[	"https://code.jquery.com/jquery-2.1.4.min.js",
            		base_path + "/js/bookmarklet.min.js"
        		]
    }
});