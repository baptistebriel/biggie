import domselect from 'dom-select';

/* ----------
config object
global shared variables
---------- */
let config = {
	
	/* ----------
	vars
	@path, {string}
	site base URL, for AJAX requests
	---------- */
	PATH: '',
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

export default config