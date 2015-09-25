/* ----------
require
---------- */
var framework = require('./framework');
var config = require('./config');
var ajax = require('please-ajax');
var Tween = require('gsap');

/* ----------
utils object
---------- */
var utils = {
	
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
		
		var slug = slug || utils.getSlug(req);

		var page = utils.createEl({
			selector: 'div',
			id: 'page-'+slug,
			styles: 'page page-'+slug
		});

		return page;
	},
	
	loadHTML: function(req, view, done) {
		
		var slug = utils.getSlug(req);
		var page = utils.createPage(req, slug);
		
		ajax.get(config.BASE+'templates/'+slug+'.html', {
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
		
		if(opt.attr) for(var index in opt.attr)
			opt.attr.hasOwnProperty(index) && el.setAttribute(index,opt.attr[index]);
		
		"a" == opt.selector && opt.link && (
			el.href = opt.link,
			opt.target && el.setAttribute("target", opt.target)
		);
		
		"img" == opt.selector && opt.src && (
			el.src = opt.src,
			opt.lazyload && (
				el.style["opacity"] = "0",
				el.onload = function(){
					TweenLite.to(el, 1, {autoAlpha: 1});
				}
			)
		);

		opt.id && (el.id = opt.id);
		opt.styles && (el.className = opt.styles);

		opt.html && (el.innerHTML = opt.html);

		opt.children && (el.appendChild(opt.children));

		return el;
	},
	
	sliceArray: function(opt) {

		return Array.prototype.slice.call(opt, 0);
	},
	
	clamp: function(min, value, max) {

		return Math.max(min, Math.min(value, max));
	},
	
	lerp: function(t, a, b) {
		
		return a + t * (b - a);
	},
	
	norm: function (t, a, b){
		
		return (t - a) / (b - a);
	},
	
	map: function(t, a0, b0, a1, b1){
		
		return utils.lerp(utils.norm(t, a0, b0 ), a1, b1);
	}

}

module.exports = utils;
