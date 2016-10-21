import framework from 'framework'
import config from 'config'
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
		
        array: {

            from(opt) {

                return Array.prototype.slice.call(opt, 0)
            },

            combine(...arrays) {

                return [].concat(...arrays)
            },

            without(arr, ...values) {

                return arr.filter(el => !values.some(exclude => el === exclude))
            },

            min(arr) {

                return Math.min(...arr)
            },

            max(arr) {

                return Math.max(...arr)
            }
        },

        math: {

            clamp(min, value, max) {

                return Math.max(min, Math.min(value, max))
            }
        },

        func: {

            once(fn) {

                let done = false

                return (...args) => {
                    if (done) return
                    done = true
                    fn(...args)
                }
            },

            interval(callback, opts = { delay: 500, duration: 1500 }) {

                let rAF, start, loop
                
                const tick = now => {

                    if (now - loop >= opts.delay) {
                        loop = now
                        callback()
                    }

                    if (now - start < opts.duration) {
                        rAF = requestAnimationFrame(tick)
                    } else {
                        cancelAnimationFrame(rAF)
                    }
                }
                
                start = loop = performance.now()
                rAF = requestAnimationFrame(tick)
            }
        },

        dom: {

            each(nodelist, callback) {
                
                let i = -1
                const l = nodelist.length

                while (++i < l)
                    callback({ el: nodelist.item(i), index: i })
            },

            scrollTop() {

                if (window.pageYOffset) return window.pageYOffset
                return document.documentElement.clientHeight ? document.documentElement.scrollTop : document.body.scrollTop
            }
        }
    },

    biggie: {
		
        addRoutingEL(a) {

            utils.js.array.from(a).forEach((el) => el.onclick = utils.biggie.handleRoute)
        },

        removeRoutingEL(a) {

            utils.js.array.from(a).forEach((el) => el.onclick = null)
        },

        handleRoute(e) {

            const target = e.currentTarget

            if(classes.has(target, 'no-route') || (target.hasAttribute('target') && target.getAttribute('target') == '_blank')) return

            e.preventDefault()

            framework.go(target.getAttribute('href'))
        },

        getSlug(req, options) {

            const params = Object.keys(req.params).length === 0 && JSON.stringify(req.params) === JSON.stringify({})
            let route = req.route === config.BASE ? '/home' : req.route
            
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

        loadPage(req, view, options, done) {

            const slug = utils.biggie.getSlug(req, options)
            const cn = slug.replace('/', '-')
            const page = create({ selector: 'div', id: `page-${cn}`, styles: `page page-${cn}` })

            view.appendChild(page)

            if(!cache[slug] || !options.cache) {
            	
            	ajax.get(`${config.BASE}templates/${slug}.html`, {
            		success: (object) => {
            			const html = object.data
            			page.innerHTML = html
            			if(options.cache) cache[slug] = html
            			done()
            		}
            	})

            } else {
            	
            	setTimeout(() => {
            		page.innerHTML = cache[slug]
            		done()
            	}, 1)
            }

            return page
        }
    }
}

export default utils