LAUNCHBAR.install({ 
	commands: 	{	deploy: function(what)
							{	
								var step = (arguments.length > 1 ? arguments[1] : 0);

								if( LAUNCHBAR.shortcuts['o ' + what] )
								{
									if( step <= 1 )
									{
										LAUNCHBAR.utils.nextTime('deploy', [what, 2]);
										LAUNCHBAR.commands.open( LAUNCHBAR.shortcuts['o ' + what] + 'deploy.php' );

										return step;
									}
									if( step <= 2 )
									{
										var $ = jQuery,
											$pw = $(':password'),
											$sb = $(':submit'),
											pw  = '',

											pws = { '.*profutura\.at': 	'adaskl422masd#22345', 
													'.*milupa\.at': 	'deb2c3b145d44f96d3b6cfac64157fde3174bf60',
													'.*aptaclub\.at': 	'd_de0ffbd3'
												  };

										if($pw.length)
										{
											$.each(pws, function(key, val)
											{
												if( location.origin.match(key) )
												{
													pw = val;
													return true;
												}
											});

											if(pw.length)
											{
												$pw.val(pw);
												$sb.click();
												$('form').submit();
											}
											else
											{
												alert('Sorry, no password found for', location.origin);
											}
										}
									}
								}
							},
					d: 		'deploy'

				},
	labels: 	{	'o mi': 	'Open Milupa [PRODUCTION]',
					'o lmi': 	'Open Milupa [LOCAL]',
					'o pf': 	'Open ProFutura [STAGE]',
					'o lpf': 	'Open ProFutura [LOCAL]',
					'o ac': 	'Open Aptaclub [STAGE]',
					'deploy': 	'Deploy',
					'd': 		'deploy'
				},
	shortcuts:  { 	'o mi': 	'http://www.milupa.at/',
					'o lmi': 	'http://localhost/mylupa.at/',
					'o pf': 	'http://stage.meinprofutura.at/profutura.at/',
					'o lpf': 	'http://localhost/profutura.at/',
					'o ac': 		'http://stage.aptaclub.at/'
				}			
});