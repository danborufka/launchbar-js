<?php 

	global $minify;

	$minify = false;

	function minify($str)
	{
		$str = trim($str);

		$rules = [	'#(?<![\:\'\\\])//[^\n]*#'	=> '', 		// remove comments
					'#/\*(.*?)\*/#m' 			=> '',	 	// remove multiline comments
					'/\s([^a-z0-9])\s/i'		=> '$1', 	// remove extra spaces
					'/\s+/' 					=> ' ',	 	// merge/unify spaces
					'/console\.(log|info)[^;]+;/' => ''	// remove console logs/infos
		];
		return preg_replace( array_keys($rules), array_values($rules), $str);
	}

	function incl($str)
	{
		global $minify;

		if($minify) 
		{
			echo(minify( file_get_contents($str) ));
		}
		else return include_once($str);
	}

	if(isset($_GET['f']))
	{
		$file = basename(trim($_GET['f']));
		$type = pathinfo($file, PATHINFO_EXTENSION);

		$mimes = [ 'css' => 'css', 'js' => 'javascript' ];

		header("Content-type: text/$mimes[$type]; charset: UTF-8"); 

		if(!file_exists( "$type/$file" ))
		{
			echo '/* Sorry, ressource ' . $file . ' not found. */';
		}
		else
		{
			echo minify( file_get_contents( "$type/$file" ) );
		}
	}

?>