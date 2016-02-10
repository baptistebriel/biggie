import framework from 'framework'
import config from 'config'
import utils from 'utils'
import $ from 'dom-select'
import classes from 'dom-classes'
import query from 'query-dom-components'

class Default {
    
    constructor(opt = {}) {
        
        this.isMobile = config.isMobile
        
        this.view = config.$view
        this.page = null
        this.a = null
    }
    
    init(req, done) {
        
        const view = this.view
        const page = this.page = utils.biggie.loadPage(req, view, this.dataAdded.bind(this, done))
    }

    dataAdded() {

        this.ui = query({ el: this.page })
        
        this.a = $.all('a', this.page);

        utils.js.arrayFrom(this.a).forEach((el) => el.onclick = this.handleRoute)
    }
    
    resize(width, height) {
        
        config.height = height
        config.width = width
    }

    handleRoute(e) {
        
        const target = e.currentTarget

        if(classes.has(target, 'no-route')) return

        e.preventDefault()

        framework.go(target.getAttribute('href'))
    }

    destroy() {
        
        utils.js.arrayFrom(this.a).forEach((el) => el.onclick = null)
    }
}

module.exports = Default