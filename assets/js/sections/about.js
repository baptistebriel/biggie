import config from '../config';
import utils from '../utils';
import classes from 'dom-classes';
import query from 'query-dom-components';
import gsap from 'gsap';
import Default from './default';

class About extends Default {
	
	constructor(opt) {
		
		super(opt);

		this.slug = 'about';

	}
	
	init(req, done) {

		super.init(req, done);

	}

	dataAdded(done) {

		this.ui = query({ el: this.page });

		done();

	}

	animateIn(req, done) {

		classes.add(config.$body, 'is-'+this.slug);

		TweenLite.to(this.page, 1, {
			y: 0,
			autoAlpha: 1,
			ease: Expo.easeInOut,
			onComplete: done
		});

	}

	animateOut(req, done) {

		classes.remove(config.$body, 'is-'+this.slug);

		TweenLite.to(this.page, 0.7, {
			y: 100,
			autoAlpha: 0,
			ease: Expo.easeInOut,
			onComplete: done
		});

	}

	destroy(req, done) {

		this.page.parentNode.removeChild(this.page);
		
		done();

	}

}

export default About