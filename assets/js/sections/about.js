import config from '../config';
import utils from '../utils';
import classes from 'dom-classes';
import gsap from 'gsap';

function about() {
	
	this.view = config.$view;
	this.slug = 'about';
	this.page = null;

};

about.prototype = {
    
	init: function(req, done) {

		var view = this.view;
		var page = this.page = utils.biggie.loadPage(req, view, done);

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
			onComplete: done
		});

	},

	destroy: function(req, done) {

		this.page.parentNode.removeChild(this.page);

	}

};

export default about