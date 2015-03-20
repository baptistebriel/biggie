/* ----------
biggie
main entry point
---------- */
/* ----------
require
---------- */
var config = require('./config');
var framework = require('./framework');
var handlers = require('./handlers');
var domready = require('domready');

/* ----------
init bigwheel framework
---------- */
framework.init();

/* ----------
other inits on domready
---------- */
domready(function() {
	
	handlers.nav();
	
});