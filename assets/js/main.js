/* ----------
biggie
main entry point
---------- */
var config = require('./config');
var framework = require('./framework');

/* ----------
gsap
---------- */
var Tween = require('gsap');
TweenLite.defaultEase = Expo.easeOut;

/* ----------
init bigwheel framework
---------- */
framework.init();