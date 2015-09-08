chrome.tabs.onUpdated.addListener(function(tab) 
{
	chrome.storage.sync.get({ autoload:true, base_path:'https://danborufka.github.io/cdn/launchbar-js/' }, 
	function(items) 
	{
		if(items.autoload)
		{
			chrome.tabs.executeScript(tab.id, { file: 'data/inject.js' });
		}
	});
});

chrome.browserAction.onClicked.addListener(function(tab) 
{
	chrome.storage.sync.get({ autoload:true, base_path:'https://danborufka.github.io/cdn/launchbar-js/' }, 
	function(items) 
	{
		if(!items.autoload)
		{
			chrome.tabs.executeScript(tab.id, { file: 'data/inject.js' });
		}
		else
		{
			chrome.tabs.create({ url: items.base_path, selected:true });
		}
	});
});