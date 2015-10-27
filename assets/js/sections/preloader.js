import config from '../config';
import classes from 'dom-classes';
import create from 'dom-create-element';
import gsap from 'gsap';

TweenLite.defaultEase = Expo.easeOut;

class Preloader {
	
	constructor(onComplete) {
		
		this.preloaded = onComplete;
		this.view = config.$view;
		this.el = null;

		this.isMobile = config.isMobile = config.width <= 1024 ? true : false;

	}
	
	init(req, done) {

		classes.add(config.$body, 'is-loading');
        	
		this.createDOM();

		done();

	}
	
	createDOM() {

		let page = this.view.firstChild;

		this.el = create({
			selector: 'div',
			styles: 'preloader',
			html: '<div class="vertical-center"><div class="vertical-el"><p>Preloader</p></div></div>'
		});

		this.view.insertBefore(this.el, page);

	}

	resize(width, height) {

		config.width = width;
		config.height = height;

	}

	animateIn(req, done) {

		let tl = new TimelineMax({ paused: true, onComplete: () => {
			done();
			// call this.preloaded to bring the first route
			this.preloaded();
		}});
		tl.to(this.el, 1, {autoAlpha: 1});
		tl.restart();

	}
	
	animateOut(req, done) {

		let tl = new TimelineMax({ paused: true, onComplete: done });
		tl.to(this.el, 1, {autoAlpha: 0});
		tl.restart();

	}

	destroy(req, done) {

		classes.add(config.$body, 'is-loaded');
		classes.remove(config.$body, 'is-loading');

		this.view.removeChild(this.el);

		done();

	}

}

export default Preloader