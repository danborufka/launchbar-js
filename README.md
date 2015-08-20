# launchbar-js
Quicklaunchbar to execute custom JS on sites.

![Launchbar.js Screenshot](http://s15.postimg.org/bfxuohv63/launchbar.jpg)

E.g.: Open up a website, hit `Ctrl + Space`, enter `hl li` and hit return to highlight all `<li>` elements.

## Using the bookmarklet

Drag the bookmarklet from [here](http://localhost/) and drop it onto your [bookmarks toolbar](https://support.mozilla.org/en-US/kb/bookmarks-toolbar-display-favorite-websites)

## Using the extension for Firefox

Install the Firefox extension from [here](https://danborufka.github.io/cdn/launchbar-js/apps/firefox/launchbar.xpi).
After installing, you can access the launchbar immediately on every page using the default shortcut `Ctrl + Space`

The shortcut can be changed from the settings page.

## Running own scripts

To add your own script to launchbar, pass an object with commands and optionally labels and shortcuts to launchbar's install command:

```javascript
	LAUNCHBAR.install({ 
		commands: 	{ ... },
		labels:		{ ... },
		shortcuts: 	{ ... }
	});
```

## Writing commands

*coming soon*

`LAUNCHBAR.chain`


#### Load by default
If you want your own command libraries to be loaded by default, you can make them accessible to launchbar if you are running a webserver using localhost. 

The URL to your localhost must be set in the extension's settings.

Example:
`URL to my own commands: http://localhost:8888/launchbar_cmds`

User of the bookmarklet can set the URL directly in the target of the bookmarklet:
`javascript:window.LAUNCHBAR={options:{user_command_path:'http://localhost/launchbar_cmds'}...`

## Getting started

*coming soon*

## Debugging

*coming soon*

`LAUNCHBAR.options`
`LAUNCHBAR.history`

To check if the launchbar has been loaded use the following line:
```javascript
if(LAUNCHBAR && LAUNCHBAR.loaded)
```

