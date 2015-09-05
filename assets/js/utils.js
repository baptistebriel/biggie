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
		
		var slug = route.substr(1).replace('/', '-');

		var page = utils.createEl({
			selector: 'div',
			id: 'page-'+slug,
			styles: 'page page-'+slug
		});

		ajax.get(config.BASE+'templates'+route+'.html', {
			success: function (object) {
				page.innerHTML = object.data;
				done();
			}
		});

		return view.appendChild(page);

	},
	
	createEl: function(opt) {

		opt = opt || {};
		
		var el = document.createElement(opt.selector);
		
		"a" == opt.selector && opt.link && (el.href = opt.link);
		"img" == opt.selector && opt.src && (el.src = opt.src);

		opt.id && (el.id = opt.id);
		opt.styles && (el.className = opt.styles);

		opt.html && (el.innerHTML = opt.html);

		opt.children && (el.appendChild(opt.children));

		return el;
	
	},
	
	sliceArray: function(opt) {

		return Array.prototype.slice.call(opt, 0);
	
	}

}

module.exports = utils;
