import config from '../config';
import utils from '../utils';
import gsap from 'gsap';
import classes from 'dom-classes';

function section() {
	
	this.view = config.$view;
	this.slug = 'section';
	this.page = null;

};

section.prototype = {
    	
	init: function(req, done) {
		
		let view = this.view;
		let page = this.page = utils.biggie.loadPage(req, view, done);

	},
	
	resize: function(width, height) {
	
		config.width = width;
		config.height = height;
	
	},

	animateIn: function(req, done) {

		classes.add(config.$body, 'is-'+this.slug);

		TweenLite.to(this.page, 1, {
			y: 0, 
			autoAlpha: 1,
			ease: Expo.easeInOut,
			onComplete: done
		});
		
	},

	animateOut: function(req, done) {

		classes.remove(config.$body, 'is-'+this.slug);

		TweenLite.to(this.page, 0.7, {
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

export default section