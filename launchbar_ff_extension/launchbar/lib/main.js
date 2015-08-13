var buttons = require('sdk/ui/button/action'),
	tabs 	= require("sdk/tabs"),
	pageMod = require("sdk/page-mod"),

	base_path = 'http://danborufka.github.io/cdn/launchbar-js',

 	button = buttons.ActionButton({
  	
	  	id: 	"launchbar-init",
	  	label: 	"Start Launchbar",
		icon: 	{
		  		  "16": "../data/icon-16.png",
		  		  "32": "../data/icon-32.png",
		  		  "64": "../data/icon-64.png"
		  		},
	  onClick: 	function(state) 
				{
				  tabs.open(base_path);
				}
	});

pageMod.PageMod({
  include: "*",
  contentScript: "self.options.urls.forEach(url => {" +
                    "	var script = document.createElement('script');" +
                    "	script.src = url; script.className = 'lb-injected';" +
                    "	document.body.appendChild(script);" +
                  	"});",
	contentScriptOptions: 
	{
        urls: 	[	"https://code.jquery.com/jquery-2.1.4.min.js",
            		base_path + "/js/bookmarklet.min.js"
        		]
    }
});