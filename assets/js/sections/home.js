import config from '../config';
import utils from '../utils';
import classes from 'dom-classes';
import query from 'query-dom-components';
import gsap from 'gsap';

function home() {
	
	this.view = config.$view;
	this.slug = 'home';
	this.page = null;
	this.ui = null;

};

home.prototype = {
    	
	init: function(req, done) {
    		
		let view = this.view;
		let slug = this.slug;
		let page = this.page = utils.biggie.loadPage(req, view, this.dataAdded.bind(this, done));
		
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

		this.ui = null;

		this.page.parentNode.removeChild(this.page);

	}

};

export default home