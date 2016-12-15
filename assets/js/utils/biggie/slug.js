import config from 'config'

export default (req, options) => {
    
    const params = Object.keys(req.params).length === 0 && JSON.stringify(req.params) === JSON.stringify({})
    let route = req.route === config.BASE ? '/home' : req.route
    
    if(!params) {
        
        for (var key in req.params) {
            if (req.params.hasOwnProperty(key)) {

                if(route.indexOf(key) > -1) {
                    route = route.replace(`:${key}`, options.sub ? '' : req.params[key])
                }
            }
        }
    }

    if(route.substring(route.length-1) == '/') {
        route = route.slice(0, -1)
    }

    return route.substr(1)
}