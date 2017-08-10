// JavaScript Document
$(document).ready(function () {
	//initialize swiper when document ready  
	var mySwiper = new Swiper('.swiper-container', {
		// Optional parameters
		direction: 'vertical',
		spaceBetween: 20,
		mousewheelControl: false,
		threshold: $(document).height * 0.15,
		shortSwipes: false,
		longSwipesMs: 0.1,
		longSwipesRatio: 0.25
	})
});
