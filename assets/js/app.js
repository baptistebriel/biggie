import framework from 'framework'
import domselect from 'dom-select'
import biggie from '@utils/biggie'
import { name, version, repository } from '../../package.json'

class App {
    
  constructor(opt = {}) {
    
    console.log(`%c${name}@${version} – ${repository.url}`, 'color: #6a6a6a')
    
    this.init()
  }
    
  init() {
    
    this.addEvents()

    framework.init()
  }

  addEvents() {
    
    // biggie.bind.add(domselect.all('nav a'))
  }
}

module.exports = App