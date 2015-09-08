
LAUNCHBAR.install({
	commands: 
	{
		check: 	function(slug)
				{
					var AD_NETWORKS = {};

					AD_NETWORKS.GDN =
					{
						name: 	"GDN Network",
						tags:	[ 'meta[name="ad.size"]' ],
						css: 	[ "border" ],
						checks:	function(check)
								{
									$("script[src*=edge]").each(function()
									{
										check &= $(this).attr('src').indexOf('adobe.com/runtime') < 0;
									});
									if(!check) return alert('Edge runtime isn\'t included using a relative path');
									
									$.get('index_edge.js')
										.done(function(data)
										{
											var check = data.indexOf('clicktag') > 0;
											if(!check) 	alert('Warning, no clicktag defined!');
										});

									return check;
								}
					};
					
					var netw 	= AD_NETWORKS[slug],
						check 	= true,
						$stage 	= $('#Stage'),
						size 	= { width: $stage.width(), height: $stage.height() };

					netw.css.forEach(function(css)
					{
						var $match = $stage.find('[style*=' + css + ']');

						//only if found and (almost) matches stage size
						check &= 	$match.length && 	
									Math.abs(size.width - $match.width())   < 4 && 
									Math.abs(size.height - $match.height()) < 4;

						if(!check) return alert(css + ' is missing!');
					});

					netw.tags.forEach(function(tag)
					{
						check &= !!$(tag).length;
						if(!check) return alert('HTML Tag is missing: <' + tag + '>');
					});

					check = netw.checks(check);

					if(check) alert('Banner is ready for '+netw.name + '!');
				}
	},
	labels:
	{
		'check': 'Checks banner for network compatibility'
	}
});