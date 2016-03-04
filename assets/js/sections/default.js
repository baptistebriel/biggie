import framework from 'framework'
import config from 'config'
import utils from 'utils'
import $ from 'dom-select'
import event from 'dom-event'
import classes from 'dom-classes'
import query from 'query-dom-components'

class Default {
    
    constructor(opt = {}) {
        
        this.isMobile = config.isMobile
        
        this.view = config.$view
        this.page = null
        this.a = null
    }
    
    init(req, done, options) {

        const opts = options || { sub: false }
        
        const view = this.view
        const ready = this.dataAdded.bind(this, done)
        const page = this.page = utils.biggie.loadPage(req, view, ready, opts)
    }

    dataAdded() {

        this.ui = query({ el: this.page })
        
        this.a = $.all('a', this.page)

        utils.biggie.addRoutingEL(this.a)
    }
    
    resize(width, height) {
        
        config.height = height
        config.width = width
    }
    
    destroy() {
        
        utils.biggie.removeRoutingEL(this.a)
    }
}

module.exports = Default