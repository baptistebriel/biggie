/* ----------
require
---------- */
var framework = require('./framework');
var config = require('./config');
var ajax = require('please-ajax')(window);

/* ----------
utils object
---------- */
var utils = {

	/* ----------
	function to load AJAX templates
	used on section.init
	don't forget the callback (done)
	see https://github.com/bigwheel-framework/documentation/blob/master/gotchas.md#forgetting-to-call-done
	---------- */
	loadPage : function(req, view, callback){
		
		var route = req.route;
		var routeDuplicate = req.params.id;

		// TODO :
		// - add 'default' route case
		if(route === "/") route = '/home';
		// - replace :id in route by the current section's id to get the template
		// not sure if it's the best way to do it tho...
		if(routeDuplicate) {
			route = route.substring(0, route.length - 3); // needs to be ':id' in routes.js
			route += routeDuplicate;
		}

		//console.log(route);

		// create page
		var page = document.createElement('div');
		var pageClass = route.substr(1).replace('/', '-');
		page.id = "page-"+pageClass;
		page.className = "page page-"+pageClass;

		// add content
		ajax.get(config.BASE+'templates'+route+'.html', {
			success: function (object) {
				page.innerHTML = object.data;
				callback(); // a.k.a. 'done();'
			}
		});

		// return page
		return view.appendChild(page);

	}

}

module.exports = utils;