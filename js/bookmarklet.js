if(!(window.hasOwnProperty('LAUNCHBAR') && LAUNCHBAR.loaded))
{
	var srv = location.protocol + '//danborufka.github.io/cdn/launchbar-js/';

	if(!window.hasOwnProperty('LAUNCHBAR'))
	{
		window.LAUNCHBAR = { options: {} };
	};

	if(!LAUNCHBAR.options.hasOwnProperty('shortcut'))
	{
		window.LAUNCHBAR.options.shortcut = 'ctrl + space';
	};
	if(!LAUNCHBAR.options.hasOwnProperty('user_command_path'))
	{
		window.LAUNCHBAR.options.user_command_path = '';
	};
	if(!LAUNCHBAR.options.hasOwnProperty('autoload'))
	{
		window.LAUNCHBAR.options.autoload = true;
	};
	if(!LAUNCHBAR.options.hasOwnProperty('base_path'))
	{
		window.LAUNCHBAR.options.base_path = srv;
	};

	//console.log('*** init by bookmarklet ***', window.LAUNCHBAR.options.shortcut);

	var init_bookmarklet = function($) 
	{
		LAUNCHBAR.options.jQuery = $;
		getScript(LAUNCHBAR.options.base_path + 'js/launchbar.min.js', function(){});
	};

	var getScript = function(url, success) 
	{
		var script = document.createElement('script');
		script.src = url;

		var head = document.getElementsByTagName('head')[0],
			done = false;

		// Attach handlers for all browsers
		script.onload = script.onreadystatechange = function() 
		{
			if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) 
			{
				done = true;
				
				// callback function provided as param
				success();
				
				script.onload = script.onreadystatechange = null;
				head.removeChild(script);
				
			}
			return false;
		};
		
		head.appendChild(script);
	};

	// Only do anything if jQuery isn't defined
	if(typeof jQuery == 'undefined' || parseFloat(jQuery.fn.jquery) < 2) 
	{
		// save old jQuery version
		var origJquery = jQuery ? jQuery.noConflict( true ) : false;

		// load new jQuery version
		getScript('//code.jquery.com/jquery-2.1.4.min.js', function() 
		{
			// save new version
			jquery_lb = jQuery.noConflict( true );

			// restore old version
			if(origJquery) 	$ = jQuery = origJquery;
			
			// and pass new one to launchbar:
			init_bookmarklet( jquery_lb );
		});
	} 
	else 
	{ 	// jQuery was already loaded
		init_bookmarklet( jQuery );
	};
}