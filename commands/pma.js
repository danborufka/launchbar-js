LAUNCHBAR.install({ 
	commands: 	{ 	sql: 		function()
								{
									var sfx = '',
										cb = function(s){ return s; };

									if(arguments.length > 1)
									{
										if(typeof arguments[1] === 'string')
										{
											sfx = $.makeArray(arguments).join(' ');
											cb = function(s){ return ''; };
										}
										else 
										{
											sfx = arguments[0];
											cb = arguments[1];
										}
									}

									console.log('sfx', sfx);

									if(sfx.length)
									{
										$('.tools [name=sql_query]')
											.val(function(i,v){ return cb(v) + sfx })
											.parent().submit();
									}
									else
									{
										$('.inline_edit_sql:first').trigger('click').trigger('mousedown').trigger('mouseup');
									}
								},
						where: 	function( field, val )
								{
									console.log('val', val);
									val = ('' + val).length ? 
											' LIKE "' + val + '"' :
											'';
									
									return LAUNCHBAR.commands.sql( ' WHERE ' + field + val, function(s){ return s.replace(/WHERE.*$/g, ''); } );
								},
						id: 	function( the_id )
								{
									return LAUNCHBAR.commands.where( 'id', the_id );
								},

						w: 'where'
				},
	labels: 	{	'sql': 		'SQL: Execute custom command',
					'where':	'SQL: Edit WHERE clause',
					'id': 		'SQL: Select specific Id'
				}
});