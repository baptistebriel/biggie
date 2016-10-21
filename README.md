# biggie
Biggie is a JavaScript application boilerplate written in ES6 based on [bigwheel](https://github.com/bigwheel-framework), a minimalist framework from [Jam3](http://www.jam3.com/).  

> :exclamation: Be sure to check out the full [documentation](https://github.com/bigwheel-framework/documentation) for bigwheel before you're getting started.

## Getting Started

```sh
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
- [bbriel.me](http://bbriel.me)
- [bigwheel-framework/built-with-bigwheel](https://github.com/bigwheel-framework/built-with-bigwheel)
- & more to come!

## Documentation

### Loading your data

> `/assets/js/utils.js`

- `loadPage(req, view, options, done)`

This function is called on `init`, for all sections that extends default.js
- 1) retrieve the slug of the current route, from the `req` parameter 
- 2) get the HTML content using AJAX, or from biggie's cache if this route already has been resolved  
- 3) create an HTML element and append it to the view  

#### Default Setup

With the default setup, it's loading static `.html` files under the `/templates` folder as such:  
i.e. with a route as `http://localhost:3000/home`, it will load `/templates/home.html`

> `assets/js/utils.js`

```js
ajax.get(`${config.BASE}templates/${slug}.html`, {
  success: (object) => {
    const html = object.data
    page.innerHTML = html
    if(options.cache) cache[slug] = html
    done()
  }
})
```

#### biggie in a sub-folder

If you want to use biggie in a subfolder of your website instead of root, edit `config.BASE` in `assets/js/config.js` so it will set the routes and get the templates using this prefix.  

Default for `config.BASE` is `/`, but if your website is under `website.com/biggie` for example, set it to `/biggie/`

#### WordPress

If you're using WordPress for example, the `loadPage` function would look like this:

> `assets/js/utils.js`

```js
const slug = utils.biggie.getSlug(req, options)
const cn = slug.replace('/', '-')
const page = req.previous ? create({ selector: 'div', id: `page-${cn}`, styles: `page page-${cn}` }) : config.$body.querySelector('.page')

if(req.previous) {

  view.appendChild(page)

  if(!cache[slug] || !options.cache) {

    ajax.get(`${config.BASE}${slug}`, {
      success: (object) => {
        const html = object.data.split(/(<body>|<\/body>)/ig)[2]
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
  
} else {

  setTimeout(done, 1)
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

> `assets/js/utils.js`

```js
ajax.get(`${config.BASE}templates/${slug}.mst`, {
  success: (object) => {
    const rendered = Mustache.render(object.data, window._data)
    page.innerHTML = rendered
    if(options.cache) cache[slug] = rendered
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
import utils from 'utils'
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
  
  dataAdded(done) {

    super.dataAdded()

    // now that the dom of your page is ready, you can now add event listeners, initialise components, etc.
    // this.addEvents()
    
    // always call done() at the end of dataAdded
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
    
    classes.add(config.$body, `is-${this.slug}`)

    TweenLite.to(this.page, 1, {
      y: 0, 
      autoAlpha: 1,
      ease: Expo.easeInOut,
      onComplete: done
    })
  }

  animateOut(req, done) {
    
    // 'req' contains the next route
    
    classes.remove(config.$body, `is-${this.slug}`)
    
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

> CSS

- `getRect(top, right, bottom, left)`

Returns the CSS rect string with clip values.

```js
const rect = utils.css.getRect(0, 300, 10, 0)
div.style.clip = rect
```

> JS

#### array

- `from(opt)`

Returns a new Array from an argument. (usually a `NodeList`)

```js
const els = document.querySelectorAll('.el')
const arr = utils.js.array.from(els)

// arr.forEach(...)
```

- `combine(...arrays)`

Combine multiple arrays into one array.

```js
const combine = utils.js.array.combine(["foo"], ["bar", "baz"], [1, 2])

// ["foo", "bar", "baz", 1, 2]
```

- `without(arr, ...values)`

Returns a copy of the array with all instances of the values removed.

```js
const without = utils.js.array.without([1, 2, 1, 0, 3, 1, 4], 0, 1)

// [2, 3, 4]
```

- `min(arr)`

Returns the minimum value in the array.

```js
const min = utils.js.array.min([10, 50, 30])

// 10
```

- `max(arr)`

Returns the maximum value in the array.

```js
const max = utils.js.array.max([10, 50, 30])

// 50
```

#### math

- `clamp(min, value, max)`

Returns a clamped value between min and max values.

```js
const min = 0
const max = 200
const value = e.deltaY
const clamped = utils.js.math.clamp(0, value, 200)
```

#### func

- `once(fn)`

Returns a new function that won't execute more than once.

```js
const yo = () => console.log('Yo')
const sayYo = utils.js.func.once(yo)
sayYo(); // 'Yo'
sayYo(); // Doesn't execute
```

- `interval(callback, options)`

Better setInterval using requestAnimationFrame.

```js
const options = { delay: 500, duration: 1500 }
utils.js.func.interval(() => console.log('tick!'), options) // will run 3 times
```

#### dom

- `each`

Iterate over a NodeList.

```js
const divs = document.querySelectorAll('div')
utils.js.dom.each(divs, (e) => {
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

- `scrollTop`

Returns either `pageYOffset` or `document.documentElement||document.body.scrollTop`, based on your browser.

```js
const scrollY = utils.js.dom.scrollTop()
```

### Gulp

We're using gulp to compile all LESS files to a single CSS file, with prefixed properties using [`autoprefixer`](https://github.com/postcss/autoprefixer).

You can write in ES6 in this project as it uses [`babelify`](https://github.com/babel/babelify), a [`browserify`](https://github.com/substack/node-browserify) transform.  
Gulp will create `build/app.js` (for development) and `build/app.min.js` with [`uglify`](https://github.com/terinjokes/gulp-uglify) (for production).

Using [`watchify`](https://github.com/substack/watchify) and [`browser-sync`](http://www.browsersync.io), your site will be live-reloaded as soon as there's changes made to the JS and/or CSS files.

### License

MIT, see [LICENSE.md](https://github.com/baptistebriel/biggie/blob/gh-pages/LICENSE).
