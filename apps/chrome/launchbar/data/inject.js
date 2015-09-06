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
		shortcut 			= items.shortcut,
		script  			= document.createElement('script');

	window.LAUNCHBAR = { options: items };

	script.src = base_path + 'js/bookmarklet.min.js'; 
	script.className = 'lb-injected';

	document.body.appendChild(script);
});