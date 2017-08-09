// JavaScript Document
var xmlns = "http://www.w3.org/2000/svg",
	xlinkns = "http://www.w3.org/1999/xlink",
	select = function (s) {
		return document.querySelector(s);
	},
	selectAll = function (s) {
		return document.querySelectorAll(s);
	},
	tail = select('.tail'),
	tailObj = {},
	bowlSVG = select('.bowlSVG'),
	waterGroup = select('.waterGroup'),
	lifeRing = select('.lifeRing'),
	allRipples = selectAll('.lifeRing ellipse')

CustomEase.create('wobble', 'M0,0 C0.011,0.029 0.017,0.536 0.023,1.022 0.029,1.511 0.035,1.981 0.047,1.952 0.059,1.924 0.065,1.464 0.071,1.022 0.077,0.58 0.083,0.156 0.095,0.183 0.106,0.209 0.112,0.624 0.118,1.02 0.124,1.418 0.13,1.799 0.142,1.773 0.154,1.747 0.16,1.376 0.166,1.02 0.172,0.664 0.178,0.324 0.19,0.348 0.202,0.371 0.208,0.703 0.213,1.018 0.219,1.335 0.225,1.636 0.237,1.613 0.249,1.59 0.255,1.297 0.261,1.018 0.267,0.738 0.273,0.473 0.285,0.494 0.297,0.515 0.303,0.772 0.309,1.016 0.315,1.26 0.32,1.491 0.332,1.471 0.344,1.451 0.35,1.227 0.356,1.014 0.362,0.803 0.368,0.604 0.38,0.622 0.392,0.64 0.398,0.833 0.404,1.014 0.41,1.195 0.416,1.365 0.427,1.348 0.451,1.311 0.451,0.698 0.475,0.731 0.499,0.764 0.499,1.275 0.523,1.243 0.547,1.213 0.547,0.794 0.57,0.822 0.594,0.848 0.594,1.183 0.618,1.157 0.642,1.133 0.642,0.873 0.666,0.894 0.69,0.914 0.69,1.109 0.713,1.09 0.737,1.071 0.737,0.932 0.761,0.947 0.785,0.962 0.785,1.054 0.809,1.041 0.833,1.029 0.833,0.973 0.856,0.982 0.88,0.99 0.88,1.018 0.904,1.01 0.928,1.004 0.928,0.996 0.952,0.998 0.976,1 0.976,1 1,1');

TweenMax.set('svg', {
	visibility: 'visible'
})
TweenMax.set(lifeRing, {
	x: 399,
	y: 300
})

TweenMax.set(allRipples, {
	transformOrigin: '50% 50%'
})
var tl = new TimelineMax();
var mainTl = new TimelineMax();
tl.from(waterGroup, 8, {
	rotation: 16,
	ease: 'wobble',
	transformOrigin: '50% 39%'
})


var ripplesTl = new TimelineMax({});
ripplesTl.staggerTo(allRipples, 7, {
	scale: 1.6,
	alpha: 0,
	repeat: -1,
	ease: Expo.easeOut
}, 1.6)

var moveTl = new TimelineMax({
	repeat: -1
});
moveTl.to(lifeRing, 8, {
		x: '-=74',
		ease: Linear.easeNone,
		onComplete: function () {

			bowlSVG.onclick(5.5)
		}
	})
	.to(lifeRing, 12, {
		x: '+=148',
		ease: Linear.easeNone,
		onComplete: function () {

			bowlSVG.onclick(6)
		}
	})
	.to(lifeRing, 8, {
		x: '-=74',
		ease: Linear.easeNone
	})

mainTl.add([tl]);


//ScrubGSAPTimeline(mainTl);

bowlSVG.onclick = function (e) {
	//console.log(typeof(e) )
	var startTime = 0;
	if (typeof (e) === 'number') {
		startTime = e;
	}
	if (mainTl.time() == mainTl.duration()) {
		mainTl.play(startTime)
	}
}
