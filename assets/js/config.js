/* ----------
require
---------- */
var domselect = require('dom-select');

/* ----------
config object
global shared variables
---------- */
module.exports = {
	
	/* ----------
	vars
	@path, {string}
	site base URL, for AJAX requests
	---------- */
	PATH: 'http://baptistebriel.github.io',
	BASE: '/',
	
	/* ----------
	DOM nodes
	$node, {HTML element}
	global shared elements
	---------- */
	$body: document.body,
	$view: domselect('#js-view')

}
