# launchbar-js
Quicklaunchbar to execute custom JS on sites

## Using the bookmarklet

Download the bookmarklet [here](http://localhost/).

## Using the extension for Firefox

Download the extension [here](http://localhost/).
After installing, you can access the launchbar immediately on every page using the default shortcut `Ctrl + Space`

The shortcut can be changed in the settings page.

## Running own scripts

To add your own script to launchbar, pass an object with commands and optionally labels and shortcuts to launchbar's install command:

```javascript
	LAUNCHBAR.install({ 
		commands: 	{ ... },
		labels:		{ ... },
		shortcuts: 	{ ... }
	});
```

*Load by default*
If you want your own command libraries to be loaded by default, you can make them accessible to launchbar if you are running a webserver using localhost. 

The URL to your localhost must be set in the extension's settings.

Example:
`Local Command Path: http://localhost:8888/launchbar_cmds`

User of the bookmarklet can set the URL directly in the target of the bookmarklet:
`javascript:window.LAUNCHBAR={options:{local_cmd_path:'http://localhost:8888/launchbar_cmds'}...`

## Getting started

To load 