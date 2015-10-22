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
	PATH: 'http://localhost:3000',
	BASE: '/',
	
	/* ----------
	DOM nodes
	$node, {HTML element}
	global shared elements
	---------- */
	$body: document.body,
	$view: domselect('#js-view'),

	/* ----------
	window bounds
	@path, {string}
	innerWidth / innerHeight
	---------- */
	width: window.innerWidth,
	height: window.innerHeight,

	/* ----------
	isMobile
	@path, {string}
	true / false
	---------- */
	isMobile: false

}