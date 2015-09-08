var config = require('../config');
var utils = require('../utils');
var Tween = require('gsap');

function Preloader(onComplete) {
    
    this.preloaded = onComplete;
    this.view = config.$view;
    this.el = null;

};

Preloader.prototype = {
    
    init: function(req, done) {
        
        var self = this;
        
        this.createDOM();
        
        done();
        
    },

    createDOM: function() {
        
        var page = this.view.firstChild;

        this.el = utils.createEl({
            selector: 'div',
            styles: 'preloader',
            html: '<div class="vertical-center"><div class="vertical-el"><p>Preloader</p></div></div>'
        });
        
        this.view.insertBefore(this.el, page);
        
    },

    resize: function(width, height) {},
    
    animateIn: function(req, done) {

        var self = this;
        
        var tl = new TimelineMax({ paused: true, onComplete: function(){
            done();
            // call this.preloaded to bring the first route
            self.preloaded();
        }});
        tl.to(this.el, 1, {autoAlpha: 1});
        tl.restart();
        
    },
    
    animateOut: function(req, done) {

        var tl = new TimelineMax({ paused: true, onComplete: done });
        tl.to(this.el, 1, {autoAlpha: 0});
        tl.restart();
        
    },
    
    destroy: function(req, done) {

        this.view.removeChild(this.el);
        
        done();
    
    }

};

module.exports = Preloader;
