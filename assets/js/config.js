import domselect from 'dom-select'

const config = {
	
	BASE: '/',
	
	body: document.body,
	view: domselect('main'),
    
	width: window.innerWidth,
	height: window.innerHeight
}

export default config