var framework = require('../framework');
var config = require('../config');
var utils = require('../utils');
var Tween = require('gsap');
var classes = require('dom-classes');
var queryDom = require('query-dom-components');

function home() {
	
	this.view = config.$view;
	this.slug = 'home';
	this.page;
	this.DOM;

};

home.prototype = {
    	
	init: function(req, done) {
    		
    		var self = this;
		var view = this.view;
		var slug = this.slug;
		var page = this.page = utils.loadPage(req, view, function(){

			var DOM = self.DOM = queryDom({ el: page });
			console.log(self.DOM);
			
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