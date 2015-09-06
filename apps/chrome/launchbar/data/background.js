
chrome.storage.sync.get(
{
	base_path:          'https://danborufka.github.io/cdn/launchbar-js/',
	autoload:           true,
	user_command_path:  '',
	shortcut:           'ctrl + space'
}, 
function(items) 
{
	var base_path			= items.base_path,
		autoload 			= items.autoload,
		user_command_path 	= items.user_command_path,
		shortcut 			= items.shortcut;

	chrome.tabs.executeScript(null,
	{
    	file: 'inject.js'
  	});

	// ### inject:
	// base_path + "/js/bookmarklet.min.js";
});