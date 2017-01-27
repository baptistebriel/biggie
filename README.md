biggie is a JavaScript application boilerplate written in ES6 based on [bigwheel](https://github.com/bigwheel-framework), a minimalist framework from [Jam3](http://www.jam3.com/).  

> :exclamation: Be sure to check out the full [documentation](https://github.com/bigwheel-framework/documentation) for bigwheel before you're getting started.

## Getting Started

```sh
# clone repo to local
git clone https://github.com/baptistebriel/biggie.git

# move into directory
cd biggie

# install dependencies
npm i

# start gulp
gulp
```

Your site will be at `http://localhost:3000` by default using [browser-sync](http://www.browsersync.io)

## Examples

- [oursroux.com](http://oursroux.com)
- [buildinamsterdam.com](http://buildinamsterdam.com)
- [flavinsky.com](http://flavinsky.com)
- [pierrelevaillant.me](http://pierrelevaillant.me)
- [alisharaf.com](http://alisharaf.com)
- [margauxgayet.com](http://margauxgayet.com)
- [bbriel.me](http://bbriel.me)
- [bigwheel-framework/built-with-bigwheel](https://github.com/bigwheel-framework/built-with-bigwheel)
- & more to come!

## Documentation

### Loading your data

> `/assets/js/utils/biggie/page.js`

- `page(req, view, options, done)`

This function is called on `init`, for all sections that extends default.js
- 1) retrieve the slug of the current route, from the `req` parameter 
- 2) get the HTML content using AJAX, or from biggie's cache if this route already has been resolved  
- 3) create an HTML element and append it to the view  

#### Default Setup

With the default setup, it's loading static `.html` files under the `/templates` folder as such:  
i.e. with a route as `http://localhost:3000/home`, it will load `/templates/home.html`

> `/assets/js/utils/biggie/page.js`

```js
ajax.get(`${config.BASE}templates/${id}.html`, {
  success: (object) => {
    const html = object.data
    page.innerHTML = html
    if(options.cache) cache[id] = html
    done()
  }
})
```

#### biggie in a sub-folder

If you want to use biggie in a subfolder of your website instead of root, edit `config.BASE` in `assets/js/config.js` so it will set the routes and get the templates using this prefix.  

Default for `config.BASE` is `/`, but if your website is under `website.com/biggie` for example, set it to `/biggie/`

#### WordPress

If you're using WordPress for example, the `page` function would look like this:

> `/assets/js/utils/biggie/page.js`

```js
const id = slug(req, options)
const cn = id.replace('/', '-')
const page = create({ selector: 'div', id: `page-${cn}`, styles: `page page-${cn}` })

view.appendChild(page)

if(!cache[slug] || !options.cache) {
  
  ajax.get(`${config.BASE}${slug}`, {
    success: (object) => {
      const html = object.data.split(/(<main>|<\/main>)/ig)[2]
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
```

> :exclamation: Be sure that your permalinks are set to use the custom structure: all your WordPress urls needs to look like `/home`, `/work/name` etc. It will not work using post id.

You might need to update your `.htaccess` as well:

```
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /
RewriteRule ^index\.php$ - [L]

RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]
RewriteRule . index.php [L]
</IfModule>
```

#### .JSON & Mustache.js

Another thing you could possibly do is use a single `.json` file for all your data and a template engine like [`mustache.js`](https://github.com/janl/mustache.js)

> `assets/js/sections/preloader.js`

```js
init(req, done) {
  classes.add(config.$body, 'is-loading')
  ajax.get(`${config.BASE}data/data.json`, {
    success: (object) => {
      window._data = object.data
      done()
    }
  })
}
```

> `/assets/js/utils/biggie/page.js`

```js
ajax.get(`${config.BASE}templates/${id}.mst`, {
  success: (object) => {
    const rendered = Mustache.render(object.data, window._data)
    page.innerHTML = rendered
    if(options.cache) cache[id] = rendered
    done()
  }
})
```

### Animations

All sections that extends the default.js have an object called `this.ui` -- using [`query-dom-components`](https://github.com/dcamilleri/query-dom-components) -- so you can access DOM nodes easily.

Here's how most of my `animateIn` & `animateOut` functions looks like:

```js
animateIn(req, done) {
  const tl = new TimelineMax({ paused: true, onComplete: done })
  tl.to(this.page, 1, { autoAlpha: 1 })
  tl.to(this.ui.foo, 1, { y: 0 })
  tl.to(this.ui.bar, 1, { x: 0 })
  // etc...
  tl.restart()
}
```

### Sections

This is an example of a section, extending Default:

```js
import config from 'config'
import event from 'dom-event'
import Default from './default'

class Section extends Default {
  
  constructor(opt) {
    
    // always call super()
    // otherwise Default's code will not run
    super(opt)
    
    // the slug is simply used to add classes to the body, for styling purposes
    this.slug = 'section'

    // custom functions of this section that needs to bind 'this'
    this.onClick = this.onClick.bind(this)
  }
  
  init(req, done) {
    
    super.init(req, done)
  }
  
  ready(done) {

    super.ready()

    // now that the dom of your page is ready, you can now add event listeners, initialise components, etc.
    // this.addEvents()
    
    // always call done() at the end of ready
    done()
  }

  addEvents() {

    event.on(this.page, 'click', this.onClick)
  }

  removeEvents() {

    event.off(this.page, 'click', this.onClick)
  }
  
  onClick(e) {

    console.log(e, this)
  }

  animateIn(req, done) {

    // 'req' contains the previous route
    
    classes.add(config.body, `is-${this.slug}`)

    TweenLite.to(this.page, 1, {
      y: 0, 
      autoAlpha: 1,
      ease: Expo.easeInOut,
      onComplete: done
    })
  }

  animateOut(req, done) {
    
    // 'req' contains the next route
    
    classes.remove(config.body, `is-${this.slug}`)
    
    TweenLite.to(this.page, 0.7, {
      y: 100,
      autoAlpha: 0,
      ease: Expo.easeInOut,
      clearProps: 'all',
      onComplete: done
    })
  }

  destroy(req, done) {
    
    super.destroy()
    
    // cleanup all event listeners, destroy components, etc...
    // this.removeEvents()

    // when you're done, don't forget to remove the page from the dom
    this.page.parentNode.removeChild(this.page)
    
    done()
  }
}

module.exports = Section
```

### Utils

> assets/js/utils/array

- `slice(opt)`

Returns a new Array from an argument. (usually a `NodeList`)

```js
import array from '@utils/array'

const els = document.querySelectorAll('.el')
const arr = array.slice(els)

// arr.forEach(...)
```

- `combine(...arrays)`

Combine multiple arrays into one array.

```js
import array from '@utils/array'
const combine = array.combine(["foo"], ["bar", "baz"], [1, 2])

// ["foo", "bar", "baz", 1, 2]
```

- `without(arr, ...values)`

Returns a copy of the array with all instances of the values removed.

```js
import array from '@utils/array'
const without = array.without([1, 2, 1, 0, 3, 1, 4], 0, 1)

// [2, 3, 4]
```

- `min(arr)`

Returns the minimum value in the array.

```js
import array from '@utils/array'
const min = array.min([10, 50, 30])

// 10
```

- `max(arr)`

Returns the maximum value in the array.

```js
import array from '@utils/array'
const max = array.max([10, 50, 30])

// 50
```

> assets/js/utils/biggie

- `bind`

Object with add/remove methods to bind/unbind HTML element with an eventListener.  
On click, it will call `framework.go` (from bigwheel) and will use the `href` of the element to resolve a new route -- exept if the element has the css class `no-route` or a `target="_blank" attribute`.

```js
import biggie from '@utils/biggie'

const a = document.querySelectorAll('nav a')
biggie.bind.add(a)
// biggie.bind.remove(a)
```

> assets/js/utils/css

- `prefixes`

Object containing vendor prefixes for CSS attributes.

```js
import css from '@utils/css'
div.style[css.prefixes.transform] = `translate3d(0,0,0)`
```

- `rect(top, right, bottom, left)`

Returns the CSS rect string with clip values.

```js
import css from '@utils/css'

const rect = css.rect(0, 300, 10, 0)
div.style.clip = rect
```

> assets/js/utils/dom

- `each`

Iterate over a NodeList.

```js
import dom from '@utils/dom'

const divs = document.querySelectorAll('div')
dom.each(divs, (e) => {
  console.log(e.index, e.el)
})

// or, using ES6
// Spread operator
[...divs].forEach(callback)

// Array.from()
Array.from(divs).forEach(callback)

// for...of statement
for (var div of divs) callback(div)
```

- `scroll(opts)`

Returns either `pageYOffset` or `document.documentElement||document.body.scrollTop`, based on your browser.

```js
import dom from '@utils/dom'
const scrollY = dom.scroll('y')
```

> assets/js/utils/func

- `once(fn)`

Returns a new function that won't execute more than once.

```js
import func from '@utils/func'

const yo = () => console.log('Yo')
const sayYo = func.once(yo)

sayYo(); // 'Yo'
sayYo(); // Doesn't execute
```

- `interval(callback, options)`

Better setInterval using requestAnimationFrame.

```js
import func from '@utils/func'

const options = { delay: 500, duration: 1500 }
func.interval(() => console.log('tick!'), options) // will run 3 times
```

> assets/js/utils/math

- `clamp(min, value, max)`

Returns a clamped value between min and max values.

```js
import math from '@utils/math'

const min = 0
const max = 200
const value = e.deltaY
const clamped = math.clamp(0, value, 200)
```

### Gulp

We're using gulp to compile all LESS files to a single CSS file, with prefixed properties using [`autoprefixer`](https://github.com/postcss/autoprefixer).

You can write in ES6 in this project as it uses [`babelify`](https://github.com/babel/babelify), a [`browserify`](https://github.com/substack/node-browserify) transform.  
Gulp will create `build/app.js` (for development) and `build/app.min.js` with [`uglify`](https://github.com/terinjokes/gulp-uglify) (for production).

Using [`watchify`](https://github.com/substack/watchify) and [`browser-sync`](http://www.browsersync.io), your site will be live-reloaded as soon as there's changes made to the JS and/or CSS files.

### License

MIT, see [LICENSE.md](https://github.com/baptistebriel/biggie/blob/gh-pages/LICENSE).
