# biggie
Biggie is a JavaScript application boilerplate based on [bigwheel](https://github.com/bigwheel-framework), a minimalist framework from [Jam3](http://www.jam3.com/).

# Getting Started

`git clone https://github.com/BaptisteBriel/biggie.git folder-name && cd folder-name && npm i && gulp`

## Directory

- `/assets/` contains all LESS & JavaScript files
- `/assets/js/sections/` the subfolder used by bigwheel for all sections, defined by routes
- `/build/` where gulp copy the minified version of /assets/ for both CSS & JavaScript
- `/data/` used for storing data JSON files
- `/gulp/ (and gulpfile.js)` for gulp tasks
- `/templates/` HTML templates used for AJAX calls

### Defining absolute URLs

For some AJAX reasons, we have global variables that defines where your site is.  
Define the `PATH` url and the subfolder `BASE` into `/assets/js/config.js`

```javascript
module.exports = {
	PATH: 'http://localhost:3000',
	BASE: '/',
}
```

Your site will be at `http://localhost:3000/` by default using [browser-sync](http://www.browsersync.io/)

## Gulp tasks

- less compilation to css
- browserify and minify javascript files
- watch for css and js files, livereload with browser-sync

## Bigwheel Documentation

[https://github.com/bigwheel-framework/documentation](https://github.com/bigwheel-framework/documentation)

## License

MIT, see [LICENSE.md](http://github.com/bigwheel-framework/bigwheel/blob/master/LICENSE).
