var domselect = require('dom-select');

/*
  * config {object}
  * object.var {string} or {DOM nodes}
  * global shared variables
*/
var config = {

	/*
	  * global variables
	  * @path, {string}
	  * site base URL, for AJAX requests
	*/
	PATH: 'http://localhost:8888',
	BASE: '/starter/',

	/*
	  * DOM nodes
	  * $node, {HTML element}
	  * global shared elements
	*/
	$body: document.body,
	$view: domselect('#js-view')

}

module.exports = config;