$(".updated_on")
	.after('<td><input class="lb_done" type="checkbox" /></i></td>');

$(document)
	.on('click', '.lb_done', function()
	{
		alert('Speicheeeern!');
	});