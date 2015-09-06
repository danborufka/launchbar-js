var user = {};

if(user.hash = localStorage.getItem('launchbar_planio_creds'))
{
	user.hash = user.hash.split(':');
	user.name = user.hash[0];
	user.pass = user.hash[1];
}
else
{
	user.name = prompt('Enter your username');
	user.pass = prompt('Enter your password');

	if(user.name && user.pass)
	{
		localStorage.setItem('launchbar_planio_creds', user.name + ':' + user.pass);
	}
}

$(".updated_on").after('<td><input class="lb_done" type="checkbox" /></i></td>');
$('table.list.issues thead th:last').after('<th>Erledigt</th>');

$(document) 
	.on('click', '.lb_done', function() 
	{ 
		var $row = $(this).parentsUntil('tr').parent(), 
			id 	 = parseInt($row[0].id.split('-')[1]);

		$.ajax({ 	username: user.name, 
					password: user.pass, 
					dataType: 'json', 
					async: 	  false, 
					url: 	  '/issues/'+id+'.json', 
					method:   'PUT', 
					data: 	  { issue: { id: id, status_id: 5 }}
				}); 
		$row.fadeOut(300); 
	});