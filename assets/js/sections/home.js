var framework = require('../framework');
var config = require('../config');
var utils = require('../utils');
var Tween = require('gsap');
var classes = require('dom-classes');
var query = require('query-dom-components');

function home() {
	
	this.view = config.$view;
	this.slug = 'home';
	this.page = null;
	this.ui = null;

};

home.prototype = {
    	
	init: function(req, done) {
    		
    		var self = this;
		var view = this.view;
		var slug = this.slug;
		var page = this.page = utils.biggie.loadHTML(req, view, this.dataAdded.bind(this, done));

	},

	dataAdded: function(done) {

		this.ui = query({ el: this.page });
			
		done();

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
			onComplete: done
		});

	},

	destroy: function(req, done) {

		this.ui = null;

		this.page.parentNode.removeChild(this.page);

	}

};

module.exports = home;
