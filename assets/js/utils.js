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
	loadPage : function(req, view, done){
		
		var route = req.route;
		var routeDuplicate = req.params.id;
		
		// TODO :
		// - add 'default' route case
		if(route === "/") route = '/home';
		// - replace :id in route by the current section's id to get the template
		// needs to be ':id' in routes.js
		if(routeDuplicate) {
			route = route.substring(0, route.length - 3);
			route += routeDuplicate;
		}

		var page = document.createElement('div');
		var pageClass = route.substr(1).replace('/', '-');
		page.id = "page-"+pageClass;
		page.className = "page page-"+pageClass;

		ajax.get(config.BASE+'templates'+route+'.html', {
			success: function (object) {
				page.innerHTML = object.data;
				done();
			}
		});

		return view.appendChild(page);

	}

}

module.exports = utils;