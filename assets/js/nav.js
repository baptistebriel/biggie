/* ----------
require
---------- */
var framework = require('./framework');
var utils = require('./utils');
var $ = require('dom-select');
var events = require('dom-events');
var classes = require('dom-classes');

/* ----------
nav object
(events)
---------- */
var nav = {

	init : function(){

		// querySelectorAll to select all divs w/ class 'js-nav'
		this.query = $.all('.js-nav'),
		// turn it into a legit javascript array
		this.array = Array.prototype.slice.call(this.query, 0);
		// use Array.prototype.forEach
		this.array.forEach(function(link){
			events.on(link, 'click', handlers.navHandler);
		});
		
	},

	// handler function
	handler : function(e){

		e.preventDefault();
		framework.go(this.getAttribute('data-href'));

	}

}

module.exports = nav;