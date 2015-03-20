/* ----------
all routes needs to be defined inline
see https://github.com/bigwheel-framework/documentation/blob/master/routes-defining.md#as-section-standard-form
---------- */
module.exports = {
	'/': require('./sections/home'),
	'/home': require('./sections/home'),
	'/about': require('./sections/about')
};