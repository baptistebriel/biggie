import framework from 'framework'
import cache from 'cache'
import ajax from 'please-ajax'
import create from 'dom-create-element'
import classes from 'dom-classes'

const utils = {
	
	css: {
		
		getRect(right, bottom, left=0, top=0) {

			return `rect(${top}px, ${right}px, ${bottom}px, ${left}px)`;
		}
	},
	
	js: {
		
		arrayFrom(opt) {
			
			return Array.prototype.slice.call(opt, 0);
		},

		clamp(min, value, max) {

			return Math.max(min, Math.min(value, max));
		},
		
		scrollTop() {

			if (window.pageYOffset) return window.pageYOffset;
			return document.documentElement.clientHeight ? document.documentElement.scrollTop : document.body.scrollTop;
		}
	},
	
	biggie: {
		
		addRoutingEL(a) {

			utils.js.arrayFrom(a).forEach((el) => el.onclick = utils.biggie.handleRoute)
		},

		removeRoutingEL(a) {

			utils.js.arrayFrom(a).forEach((el) => el.onclick = null)
		},

		handleRoute(e) {
        	
	        const target = e.currentTarget

	        if(classes.has(target, 'no-route')) return
	        
	        e.preventDefault()

	        framework.go(target.getAttribute('href'))
	    },

		getSlug(req, options) {
			
			let route = req.route === "/" ? '/home' : req.route;
			const params = Object.keys(req.params).length === 0 && JSON.stringify(req.params) === JSON.stringify({})
			
			if(!params) {
				
				for (var key in req.params) {
			        if (req.params.hasOwnProperty(key)) {

			        	if(route.indexOf(key) > -1) {
			        		route = route.replace(`:${key}`, options.sub ? '' : req.params[key])
			        	}
			        }
			    }
			}
			
			if(route.substring(route.length-1) == '/') {
				route = route.slice(0, -1)
			}

			return route.substr(1)
		},
		
		createPage(req, slug) {

			const cn = slug.replace('/', '-')
			
			return create({
				selector: 'div',
				id: `page-${cn}`,
				styles: `page page-${cn}`
			})
		},
		
		loadPage(req, view, options, done) {
			
			const slug = utils.biggie.getSlug(req, options)
			const page = utils.biggie.createPage(req, slug)

			view.appendChild(page)

			if(!cache[slug] || !options.cache) {

				ajax.get(`/templates/${slug}.html`, {
					success: (object) => {
						const html = object.data
						page.innerHTML = html
						if(options.cache) cache[slug] = html
						done()
					}
				})

			} else {

				page.innerHTML = cache[slug]
				done()
			}

			return page
		}
	}
}

export default utils