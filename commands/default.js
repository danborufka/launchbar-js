var tmp = {},
	cmds_default = { 
	commands: 	{ 	open: function(file, _blank)
					{
						if(file)
						{
							if(!file.match(/^[on] .+/))
							{
								file = (_blank ? 'n' : 'o') + ' ' + file;
							}

							var filename = file.toLowerCase();

							file = apply_shortcut( filename, LAUNCHBAR.shortcuts );

							if(file.match(/^[on] .+/))
							{
								file = file.slice(2);
							}

							if(filename.indexOf('/') > 0)
							{
								var query = filename.split('/');
								query.shift();
								file += '/' + query.join('/');
							}

							file = LAUNCHBAR.utils.checkUrl( file );

							if(_blank)
							{
								window.open(file);
							}
							else
							{
								location.href = file;
							}
						}
						else alert('Please supply a URL!');

						return LAUNCHBAR.commands;
					},
					new: function(file)
					{
						return LAUNCHBAR.commands.open(file, true);
					},
					highlight: function()
					{
						var $els;
						
						if(arguments.length)
						{
							jQuery('*:not(:has(*))').addClass('lb-dimmed');
							jQuery( jQuery.makeArray(arguments).join(' ') ).removeClass('lb-dimmed').addClass('lb-highlighted');
							jQuery( LAUNCHBAR.dom.core ).find('*').andSelf().removeClass('lb-dimmed');
						}
						else
						{
							jQuery('.lb-dimmed').removeClass('lb-dimmed');
							jQuery('.lb-highlighted').removeClass('lb-highlighted');
						};
						
						return LAUNCHBAR.commands;
					},

					remember: function(host)
					{
						var list = [];

						jQuery.each(LAUNCHBAR.history, function(i, val) 
						{
							if(i !== 'default') list.push(i);
						});

						if(list.length)
						{
							localStorage.LAUNCHBAR_COMMANDS = list.join(',');		// save to localStorage for next init()
						}
						else
						{
							return false;
						}
						return LAUNCHBAR.commands;
					},

					forget: function(cmd)
					{
						if(cmd)
						{
							localStorage.LAUNCHBAR_COMMANDS = localStorage.LAUNCHBAR_COMMANDS.replace(new RegExp(',?' + cmd + ',?'), ',').replace(/^,|,$/, '');
						}
						else
						{
							localStorage.removeItem("LAUNCHBAR_COMMANDS");
						}
						return LAUNCHBAR.commands;
					},

					links: function(filter, internal)
					{
						var $links = $('a[href]');

						if(!internal)
						{
							$links = $links
								.filter(':not([href^="#"],[href^="/"])')
								.filter(function(){ return this.host !== location.host; });
						}

						if(filter)
						{
							$links = $links.filter(":contains(" + filter + ")")
								.add($links.filter("[href*=" + filter + "]"));
						}
						$links = $.unique( $links );

						try{
							window.open('', 'Links', '').document.write( 
								$.makeArray(
									$links.map(function()
									{ 
										return '<a href="' + this.href + '">' + 
													this.href + 
												']</a><br>'; 
									})
								).join('') 
							);
						}
						catch(e)
						{
							console.error('You must allow popups for "links" to work its magic.');
						}

					},

					reload: function()
					{
						var freq  = arguments[0] || 0,
							units = ['h','m','s','ms'],
							jumps = [ 0, 60, 60, 1000],

							v = parseInt(freq),
							u = freq.toString().match(/[^\d]+/), 
							f;

						if(u)
						{
							u = u[0];
							f = jQuery.inArray( u, units );
							jQuery.each(jumps.slice( f+1 ), function(index, val) 
							{
								v *= val;
							});
						}
						
						if(v > 10)
						{
							LAUNCHBAR.utils.nextTime( 'reload', v );
						}
						else
						{
							LAUNCHBAR.utils.noNextTime( 'reload' );
						}
						tmp.reloading = setTimeout(function(){ location.reload(); }, v);

						return LAUNCHBAR.commands;
					},

					o: 'open',
					n: 'new',
					x: 'example',
					hl: 'highlight'
				},
	labels: 	{	'open': 	'Open link in same window',
					'new': 		'Open link in new tab',
					'highlight':'Highlights sizzled elements',
					'reload': 	'Reload in intervals',
					'remember': 'Remember loaded commands for next time',
					'forget': 	'Forget loaded commands',

					/* shortcuts: */
					'o': 'open', 'n': 'new'
				}
};
LAUNCHBAR.install( cmds_default );