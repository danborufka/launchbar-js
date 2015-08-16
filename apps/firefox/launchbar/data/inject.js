var s = document.createElement('script'); 
	s.className = 'lb-injected';
  	s.innerHTML = 'window.LAUNCHBAR = { options:' + JSON.stringify( self.options.settings ) + '};';
  	
document.body.appendChild(s);

self.options.urls.forEach(url => 
{
	var script = document.createElement('script');

	if(url[0] == '/')
	{
		url = self.options.settings.base_path + url;
	}

	script.src = url; script.className = 'lb-injected';
	document.body.appendChild(script);
});