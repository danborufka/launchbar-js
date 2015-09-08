
LAUNCHBAR.install({
	commands: 
	{
		check: 	function(slug)
				{
					var AD_NETWORKS = {};

					AD_NETWORKS.GDN =
					{
						name: 	"GDN Network",
						tags:	[ "meta[name=\"ad.size\"][content]" ],
						css: 	[ "border" ],
						checks:	function()
								{
									var check 		= true;
									
									check &= $("script[src*=edge]").attr('src').indexOf('adobe.com/runtime') < 0;
									if(!check) alert('Edge runtime isn\'t included using a relative path');
									
									$.ajax('index_edge.js')
										.done(function(data)
										{
											var check = (data.indexOf('window.open(') < 0) && (data.indexOf('clicktag') < 0);
											if(!check) alert('No clicktag defined!');
										});

									return check;
								}
					};
					
					var netw = AD_NETWORKS[slug],
						check = true,
						$stage = $('#Stage'),
						size = { width: $stage.width(), height: $stage.height()  };

					netw.css.forEach(function(css)
					{
						var $match = $stage.find('[style*=' + css + ']');

						check &= 	$match.length && 	
									Math.abs(size.width - $match.width())   < 4 && 
									Math.abs(size.height - $match.height()) < 4;

						if(!check) alert(css + ' is missing!');
					});

					netw.tags.forEach(function(tag)
					{
						console.log(tag, $(tag));
						check &= !!$(tag).length;
						if(!check) alert('HTML Tag is missing: <' + tag + '>');
					});

					if(check) alert('Banner is ready for ' + netw.name + '!');
				}
	},
	labels:
	{
		'check': 'Checks banner for network compatibility'
	}
});