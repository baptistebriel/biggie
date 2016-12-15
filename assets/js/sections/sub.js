import framework from 'framework'
import config from 'config'
import classes from 'dom-classes';
import create from 'dom-create-element'
import query from 'query-dom-components'

class Sub {
    
    constructor(opt = {}) {
        
        this.view = config.view
        this.slug = null
        this.el = null
        this.ui = null
        this.a = null
    }
    
    init(req, done) {
           
        const id = req.params.id
        const view = this.view
        const slug = this.slug = `sub-${id}`
        
        const template = `
            <div class="vertical-align">
                <div class="vertical-align__item">
                    <span>Gallery ${id}</span>
                </div>
            </div>
        `
        
        this.el = create({
            selector: 'div',
            styles: `sub-item ${this.slug}`,
            html: template
        })

        this.view.appendChild(this.el)

        this.ui = query({ el: this.el })
        
        done()
    }
    
    animateIn(req, done) {

        classes.add(config.body, `is-${this.slug}`)
        
        this.el.style.display = 'block'

        const tl = new TimelineMax({ paused: true })
        tl.to(this.el, 1, { x: 0, ease: Expo.easeInOut });
        tl.restart()
        
        done()
    }

    animateOut(req, done) {
         
        classes.remove(config.body, `is-${this.slug}`)

        const tl = new TimelineMax({ paused: true, onComplete: done })
        this.el && tl.to(this.el, 0.7, { x: '100%', ease: Expo.easeInOut, clearProps: 'all' })
        tl.restart()
    }
    
    resize(width, height) {}

    destroy(req, done) {
        
        this.el.parentNode.removeChild(this.el)
        this.el = null
        
        done()
    }
}

module.exports = Sub