var s = document.createElement('script'); 
	s.className = 'lb-injected';
  	s.innerHTML = 'window.LAUNCHBAR = { options:' + JSON.stringify( self.options.settings ) + '};';
  	
document.body.appendChild(s);

var url 	= self.options.url,	
	script  = document.createElement('script');

if(url[0] == '/')
{
	url = self.options.settings.base_path + url.slice(1);
}
script.src = url; script.className = 'lb-injected';
document.body.appendChild(script);