# biggie
Biggie is a JavaScript application boilerplate based on [bigwheel](https://github.com/bigwheel-framework), a minimalist framework from [Jam3](http://www.jam3.com/).
It uses [Node.js](https://nodejs.org/) for [npm](https://www.npmjs.com/) modules, and [browerify](http://browserify.org/) to make it work on any browsers.

# Getting Started

### Clone the repository

`git clone https://github.com/BaptisteBriel/biggie.git`

### Install Node

If you don't have npm, install [Node.js](https://nodejs.org/).  
Now, copy all npm dependecies in your project folder with `npm i`.  
You should now have a node_modules folder at the root directory.  

### Install gulp

Install [gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) globally with `npm install --global gulp`  
You should be able to start `gulp watch` from Terminal.

##### tasks
- less compilation to css
- browserify and minify javascript files
- watch for assets/less/layout.less and assets/js/*.js

## Directory

- `/assets/` contains all LESS files and JavaScript files
- `/assets/js/sections/` the subfolder used by bigwheel for all pages, defined by routes
- `/build/` where gulp copy the minified version of /assets/ for both CSS and JavaScript
- `/data/` used for storing data JSON files
- `/gulp/ (and gulpfile.js)` for gulp tasks
- `/templates/` HTML templates used for AJAX calls

### Defining absolute URLs

For some AJAX reasons, we have global variables that defines where your site is.  
Define the `PATH` url and the subfolder `BASE` into `/assets/js/config.js`

```javascript
module.exports = {
	PATH: 'http://localhost:8888',
	BASE: '/biggie/'
}
```

Your site will be at `http://localhost:8888/biggie/` here. Using a simple [HTTP server](https://www.npmjs.com/package/http-server) or MAMP, etc...
This allows you to work on a subfolder or a different server before pushing it into prod in two secs.

## Bigwheel Documentation

[https://github.com/bigwheel-framework/documentation](https://github.com/bigwheel-framework/documentation)

## License

MIT, see [LICENSE.md](http://github.com/bigwheel-framework/bigwheel/blob/master/LICENSE).
