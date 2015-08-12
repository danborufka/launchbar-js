<?php 

	$routes = [ 	'js/launchbar.min.js' 												=> 'js/launchbar_js.php',
					'../danborufka.github.io/cdn/launchbar-js/js/launchbar.min.js' 		=> 'js/launchbar_js.php',
					'../danborufka.github.io/cdn/launchbar-js/js/bookmarklet.min.js' 	=> 'js/bookmarklet.min.js'
			  ];

	$ssl = isset($_SERVER['HTTPS']);
	$protocol = 'http' . ($ssl ? 's' : '');

	$url = dirname("$protocol://$_SERVER[HTTP_HOST]/$_SERVER[REQUEST_URI]");

	foreach ($routes as $target => $route) 
	{
		$compiled = file_get_contents("$url/$route");
		if( file_put_contents($target, $compiled) )
		{
			//var_dump(glob('../*.*'));
			echo "<b>$route</b> compiled to <b>$target</b>.<br>";
		}
	}

?>