LAUNCHBAR.commands.install(
{
	commands: 
	{
		scrape: function()
				{
					var $ctrl 		= jQuery('.tageprevnext'),
						the_date 	= $ctrl.next().text(),
						the_content = $ctrl.siblings('.textItem').eq(0).text(),
						scrapes 	= [];

					if(localStorage.getItem('scraped'))
					{
						scrapes = localStorage.scraped.split('|');
					}

					scrapes.push(the_date + ' / ' + the_content);
					localStorage.scraped = scrapes.join('|');

					LAUNCHBAR.utils.nextTime('scrape');

					setTimeout(function(){ window.location = $ctrl.find('.left a')[0].href }, 1000);
				},
		output: function()
				{
					LAUNCHBAR.utils.noNextTime();

					var html = localStorage.scraped.split('|').join('<br>');
					window.open('javascript:document.write("' + html.replace("\n", '<br>') + '");');

					delete localStorage.scraped;
				}
	}
});