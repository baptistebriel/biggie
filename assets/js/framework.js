var bigwheel = require('bigwheel');

var framework = bigwheel(function() {
	return {
		routes: require('./routes')
	};
});

module.exports = framework;