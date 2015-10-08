/* ----------
require
---------- */
var ajax = require('please-ajax');
var create = require('dom-create-element');

/* ----------
utils
---------- */
var utils = {
	
	/* ----------
	CSS utils
	---------- */
	css: {

		getRect: function(top, right, bottom, left) {

			return 'rect('+ top +'px,'+ right +'px,'+ bottom +'px,'+ left +'px)';

		}

	},

	/* ----------
	JS utils
	---------- */
	js: {

		sliceArray: function(opt) {

			return Array.prototype.slice.call(opt, 0);

		},

		clamp: function(min, value, max) {

			return Math.max(min, Math.min(value, max));

		}

	}
	
	/* ----------
	biggie utils
	---------- */
	biggie: {

		getSlug: function(req) {
			
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

			return slug;

		},

		createPage: function(req, slug) {
			
			var slug = slug || utils.biggie.getSlug(req);

			var page = create({
				selector: 'div',
				id: 'page-'+slug,
				styles: 'page page-'+slug
			});

			return page;

		},
		
		loadHTML: function(req, view, done) {

			var slug = utils.biggie.getSlug(req);
			var page = utils.biggie.createPage(req, slug);
			
			ajax.get('/templates/'+slug+'.html', {
				success: function (object) {
					page.innerHTML = object.data;
					done();
				}
			});

			return view.appendChild(page);

		}

	}

}

module.exports = utils;