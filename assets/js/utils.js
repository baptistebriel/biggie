import framework from 'framework'
import ajax from 'please-ajax'
import create from 'dom-create-element'
import classes from 'dom-classes'

const utils = {
	
	css: {
		
		getRect(top=0, right, bottom, left=0) {

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
			
			let route = req.route
			
			// TODO :
			// - add 'default' route case
			if(route === "/") route = '/home';
			
			// TODO:
			// - parse req.params object
			// - find and replace all key occurences of this object into `route`
			// i.e. :
			// - `req.params` is { category: 'digital', id: 'project-name' }
			// - `route` is /work/:category/:id
			// - it will not work in this case yet...
			if(req.params.id) {
				
				// - currently we just replace :id in `route` by the current section's `id` to get the template
				// - if it's a sub-route, we load the parent template. i.e. : /gallery/:id with sub route enabled will load gallery.html
				const length = options.sub ? 4 : 3
				
				route = route.substring(0, route.length - length)
				!options.sub && (route += req.params.id)
			}
			
			return route.substr(1).replace('/', '-')
		},
		
		createPage(req, slug) {
			
			return create({
				selector: 'div',
				id: `page-${slug}`,
				styles: `page page-${slug}`
			})
		},
		
		loadPage(req, view, done, options) {
			
			const slug = utils.biggie.getSlug(req, options)
			const page = utils.biggie.createPage(req, slug)
			
			ajax.get(`/templates/${slug}.html`, {
				success: (object) => {
					page.innerHTML = object.data;
					done();
				}
			})

			return view.appendChild(page)
		}
	}
}

export default utils
