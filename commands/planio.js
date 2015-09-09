var user = { name:'Dan', pass:'danplan10' };

$(".updated_on")
	.after('<td><input class="lb_done" type="checkbox" /></i></td>');

$('table.list.issues thead th:last').after('<th>Erledigt</th>');

$(document)
	.on('click', '.lb_done', function()
	{
		var $row 	= $(this).parentsUntil('tr').parent(),
			id 		= parseInt($row[0].id.split('-')[1]);

		$.ajax({
			username: 	user.name,
			password: 	user.pass,
			dataType: 	'json',
			async: 		false,
			url: 		'/issues/' + id + '.json',
			method: 	'PUT',
			data: 		{ issue: { id: id, status_id: 5, notes: 'Würde ich als erledigt erachten.' } }
		}).done(function()
		{
			console.log('say whaaat');
		});

		$row.fadeOut(300);
	});