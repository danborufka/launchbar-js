/* autocomplete command palette */

var lookup_table = {};
	/*
	{ 	i18n: 	'internationalization',
		uawg: 	'Um Antwort wird gebeten',
		lmfao: 	'laughing my fucking ass off',
		'p-i': 	'pjure isobar',
		'd-b': 	'Dan Borufka',
		'fG': 	'freundliche Grüße',
		'RR': 	'Rückruf',
		'1/4': 	'¼',
		'1/2': 	'½',
		'^2': 	'²',
		'==>': 	'⇒'
	};
	*/

(function($) 
{
	lookup_table = $.extend(true, lookup_table, LAUNCHBAR.storage['ac.dict']);

    $.fn.setCaret = function(caretPos) 
	{
		var self = this.get(0);
	    if(self != null) 
	    {
	        if(self.createTextRange) 
	        {
	            var range = self.createTextRange();
	            range.move('character', caretPos);
	            range.select();
	        }
	        else if(self.selectionStart) 
            {
                self.focus();
                self.setSelectionRange(caretPos, caretPos);
            }
            else
            {
                self.focus();
	        }
	    }

	    return this;
	};

	function autochange()
	{
		var $this 		= $(this),
			val 		= $this.val(),
			textparts 	= val.split( /([\s\,\.\;\!\?\:\"\'])/ ),
			replaced 	= false,
			caretPos, i;

		console.log('autochanging??');

		(function()	// function wrapper so we can exit for-loop using return
		{
			for(i=textparts.length-1; i--; i)
			{
				if(textparts[i].length)
					if(lookup_table[ textparts[i] ])
					{
						replaced = true;
						textparts[i] = lookup_table[ textparts[i] ];
						return;
					}
			}
		}());

		if(replaced)
		{		
			caretPos = textparts.slice(0, i+1).join('').length;
			textparts = textparts.join('');

			$this
				.val( textparts )
				.setCaret( caretPos + 1 );
		}
	};

	$(document)
		.on('keyup', 'textarea, :text:not("#launchbar *"), input[type=email]', function(e)
		{
			switch(e.which)
			{
				case ','.charCodeAt(): 	case 190:
				case '.'.charCodeAt(): 	case 188:
				case '!'.charCodeAt(): 	case 49:
				case '?'.charCodeAt(): 	case 63:
			
				case KEYS.SPACE:
				case KEYS.RETURN:
				case KEYS.TAB:

					autochange.call( this );
			}
		})
		.on('blur', autochange);

})(jQuery);

LAUNCHBAR.install({ 
	commands: 
	{  
		ac: function(shortcut, by)
		{
			if(!by)
			{
				by = LAUNCHBAR.utils.getSelectedText();
			};

			if(by)
			{
				if(!LAUNCHBAR.storage.hasOwnProperty('ac.dict'))
				{
					LAUNCHBAR.storage['ac.dict'] = {};
				};

				LAUNCHBAR.storage['ac.dict'][shortcut] = by;
				LAUNCHBAR.storage.save();

				lookup_table[shortcut] = by;

			}
		}
	},
	labels: {}
});