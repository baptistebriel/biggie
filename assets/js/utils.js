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
		// TODO : Add 'default' route case
		// case 'default'
		if(route === "/") route = '/home';

		// create page
		var page = document.createElement('div');
		page.className = "page page-"+route.substr(1);

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