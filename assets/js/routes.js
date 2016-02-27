/* ----------
all routes needs to be defined inline
see https://github.com/bigwheel-framework/documentation/blob/master/routes-defining.md#as-section-standard-form
---------- */
module.exports = {
	'/': require('./sections/home'),
	'/home': { section: require('./sections/home') },
	'/about': { section: require('./sections/about') },
	'/section/:id': { section: require('./sections/section'), duplicate: true },
    '/gallery': { section: require('./sections/gallery'), routes: {
            '/:id': { section: require('./sections/sub') }
        }
    }
}