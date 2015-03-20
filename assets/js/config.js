/* ----------
require
---------- */
var domselect = require('dom-select');

/* ----------
config object
global shared variables
---------- */
var config = {

	/* ----------
	vars
	@path, {string}
	site base URL, for AJAX requests
	---------- */
	PATH: 'http://localhost:8888',
	BASE: '/biggie/',

	/* ----------
	DOM nodes
	$node, {HTML element}
	global shared elements
	---------- */
	$body: document.body,
	$view: domselect('#js-view')

}

module.exports = config;