var framework = require('../framework');
var config = require('../config');
var utils = require('../utils');
var Tween = require('gsap');
var classes = require('dom-classes');

function section() {
	
	this.view = config.$view;
	this.slug = 'section';
	this.page = null;

};

section.prototype = {
    
	init: function(req, done) {

		var view = this.view;
		var page = this.page = utils.biggie.loadHTML(req, view, done);

	},
	
	resize: function(width, height) {
	
		config.width = width;
		config.height = height;
	
	},

	animateIn: function(req, done) {

		classes.add(config.$body, 'is-'+this.slug);

		Tween.to(this.page, 1, {
			y: 0, 
			autoAlpha: 1,
			ease: Expo.easeInOut,
			onComplete: done
		});
		
	},

	animateOut: function(req, done) {

		classes.remove(config.$body, 'is-'+this.slug);

		Tween.to(this.page, 0.7, {
			y: 100,
			autoAlpha: 0,
			ease: Expo.easeInOut,
			clearProps: 'all',
			onComplete: done
		});

	},

	destroy: function(req, done) {

		this.page.parentNode.removeChild(this.page);

	}

};

module.exports = section;
