var config = require('../config');
var framework = require('../framework');
var utils = require('../utils');
var nav = require('../nav');
var $ = require('dom-select');
var Tween = require('gsap');
var events = require('dom-events');
var classes = require('dom-classes');

function home() {
	
	this.view = config.$view;
	this.slug = 'home';
	this.page;

};

home.prototype = {
    
    init: function(req, done) {

		var _this = this;
		var view = this.view;
		
		// notifying bigwheel we're done before we actually are
		// https://github.com/bigwheel-framework/documentation/blob/master/sections-init.md#issue-2-notifying-bigwheel-were-done-before-we-actually-are
		var page = this.page = utils.loadPage(req, view, function(){

			// we need to create a callback
			// so we can attach event listners
			// to the ajax loaded content
			_this.query = $.all('.js-nav'),
			_this.array = Array.prototype.slice.call(_this.query, 0);
			
			_this.array.forEach(function(link){
				events.on(link, 'click', nav.handler);
			});

			done();

		});

	},

	resize: function(width, height) {
	
		//console.log(width+' | '+height);
	
	},

	animateIn: function(req, done) {

		classes.add(config.$body, 'is-'+this.slug);

		Tween.from(this.page, 1, {
			y: -100, 
			autoAlpha: 0,
			ease: Expo.easeInOut, 
			onComplete: done
		});

	},
	
	animateOut: function(req, done) {

		console.log(req.route);

		classes.remove(config.$body, 'is-'+this.slug);

		Tween.to(this.page, 0.25, {
			y: 100,
			autoAlpha: 0,
			ease: Expo.easeInOut,
			onComplete: done
		});

	},

	destroy: function(req, done) {

		this.page.parentNode.removeChild(this.page);

	}

};

module.exports = home;