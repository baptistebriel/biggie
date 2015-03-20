/* ----------
require
---------- */
var framework = require('./framework');
var utils = require('./utils');
var $ = require('dom-select');
var events = require('dom-events');
var classes = require('dom-classes');

/* ----------
handlers object
(events)
---------- */
var handlers = {
	
	nav : function(){

		this.query = $.all('.js-nav'),
		this.array = Array.prototype.slice.call(this.query, 0);

		this.array.forEach(function(link){
			events.on(link, 'click', handlers.navHandler);
		});
		
	},

	navHandler : function(e){

		e.preventDefault();
		framework.go(this.getAttribute('data-href'));

	}

}

module.exports = handlers;