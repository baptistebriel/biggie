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

module.exports = framework;