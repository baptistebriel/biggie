import framework from '../framework';
import config from '../config';
import utils from '../utils';
import event from 'dom-event';
import $ from 'dom-select';

class Default {
    
    constructor(opt) {
        
        opt = opt || {};
        
        this.isMobile = config.isMobile;
        
        this.view = config.$view;
        this.page = null;

    }
    
    init(req, done) {
        
        let view = this.view;
        let page = this.page = utils.biggie.loadPage(req, view, this.dataAdded.bind(this, done));

    }
    
    resize(width, height) {
        
        config.height = height;
        config.width = width;
        
    }

}

export default Default
