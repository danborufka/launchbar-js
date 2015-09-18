<?php 

	$routes = [ 	
					'../danborufka.github.io/cdn/launchbar-js/index.html' 					=> 'index.html',
					//'../danborufka.github.io/cdn/launchbar-js/updates.rdf' 					=> 'updates.rdf',
					'js/launchbar.min.js' 													=> 'js/launchbar_js.php',
					'../danborufka.github.io/cdn/launchbar-js/js/launchbar.min.js' 			=> 'js/launchbar_js.php',
					'../danborufka.github.io/cdn/launchbar-js/js/bookmarklet.min.js' 		=> 'js/bookmarklet.min.js',
					'../danborufka.github.io/cdn/launchbar-js/apps/firefox/launchbar.xpi' 	=> 'apps/firefox/launchbar.xpi',
					'../danborufka.github.io/cdn/launchbar-js/apps/chrome/launchbar.crx' 	=> 'apps/chrome/launchbar.crx'
			  ];

	$commands = glob('commands/*.js');
	$commands = array_combine( 
					array_map(function($v){ return "../danborufka.github.io/cdn/launchbar-js/$v"; }, $commands),  
					str_replace('.js', '.min.js', $commands)	// all of them minified
					//$commands
				);

	$routes = array_merge($routes, $commands);

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
		else
			echo "Could'nt write to <b>$target</b>.<br>";
	}

	echo '<pre>';
	echo file_get_contents('http://localhost/danborufka.github.io/deploy.php');
	echo '</pre>';

?>
<script type="text/javascript" src="//code.jquery.com/jquery-2.1.4.min.js"></script>
<script>window.LAUNCHBAR = {};</script>
<script type="text/javascript" src="//localhost/launchbar-js/js/launchbar_js.php"></script>