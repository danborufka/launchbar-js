# launchbar-js
Quicklaunchbar to execute custom JS on sites.
E.g.: Open up a website, hit Ctrl + Space, enter `hl li` to highlight all <li> elements.

## Using the bookmarklet

Drag the bookmarklet from [here](http://localhost/) and drop it onto your [bookmarks toolbar](https://support.mozilla.org/en-US/kb/bookmarks-toolbar-display-favorite-websites)

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

#### Load by default
If you want your own command libraries to be loaded by default, you can make them accessible to launchbar if you are running a webserver using localhost. 

The URL to your localhost must be set in the extension's settings.

Example:
`Local Command Path: http://localhost:8888/launchbar_cmds`

User of the bookmarklet can set the URL directly in the target of the bookmarklet:
`javascript:window.LAUNCHBAR={options:{local_cmd_path:'http://localhost:8888/launchbar_cmds'}...`

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
