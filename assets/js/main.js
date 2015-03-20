var config = require('./config');
var framework = require('./framework');
var handlers = require('./handlers');
var domready = require('domready');

framework.init();

domready(function() {
	
	handlers.nav();
	
});