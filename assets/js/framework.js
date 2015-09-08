/* ----------
require
---------- */
var bigwheel = require('bigwheel');

/* ----------
create our framework instance
see https://github.com/bigwheel-framework/documentation/blob/master/quickstart.md#bigwheel-quick-start
---------- */
var framework = bigwheel(function(done) {
	done({
		// https://github.com/bigwheel-framework/documentation/blob/master/misc.md#overlap
		overlap: false,
		// https://github.com/bigwheel-framework/documentation/blob/master/routes-special.md#initsection
		initSection: require('./sections/preloader'),
		routes: require('./routes')
	});
});

module.exports = framework;
