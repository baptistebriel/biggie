/* ----------
require
---------- */
var bigwheel = require('bigwheel');

/* ----------
create our framework instance
see https://github.com/bigwheel-framework/documentation/blob/master/quickstart.md#bigwheel-quick-start
---------- */
var framework = bigwheel(function() {
	return {
		routes: require('./routes')
	};
});

// if you need a preloader (initSection)
// https://github.com/bigwheel-framework/documentation/blob/master/routes-special.md#initsection
// var framework = bigwheel(function(done) {
// 	done({
// 		overlap: false,
// 		initSection: require('./sections/preloader'),
// 		routes: require('./routes')
// 	});
// });

module.exports = framework;
