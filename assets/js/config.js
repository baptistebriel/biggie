import domselect from 'dom-select'

const config = {
	
	PATH: '',
	BASE: '/',
	
	$body: document.body,
	$view: domselect('#js-view'),

	width: window.innerWidth,
	height: window.innerHeight,

	isMobile: false
	
}

export default config