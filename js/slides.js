// JavaScript Document
var slideIndex = 0;
var slides = document.getElementById("slider_id").children;
var slide_buttons = document.getElementById("slider_button_id").children;
$(".slider ol li").on("click", function () {
	slideIndex = $(this).index();
	//$(this).addClass("active").siblings("li").removeClass("active");
	$(slide_buttons[slideIndex]).addClass("active").siblings("li").removeClass("active");
	$(".slider ul").animate({
		top: -$(".slider").height() * slideIndex
	}, 500);

});

function nextSlide() {
	slideIndex += 1;
	showSlides(slideIndex);
}

function previousSlide() {
	slideIndex -= 1
	showSlides(slideIndex);
}

function showSlides(n) {
	var prev = slideIndex;
	var slides = document.getElementsByClassName("mySlide");
	if (n >= slides.length) {
		slideIndex = n % slides.length;
	}
	if (n < 0) {
		slideIndex = (n + slides.length) % slides.length;
	}
	$(slide_buttons[slideIndex]).addClass("active").siblings("li").removeClass("active");
	$(".slider ul").animate({
		top: -$(".slider").height() * slideIndex
	}, 500);
}

$(document).ready(function () {
	//initialize swiper when document ready  
	var mySwiper = new Swiper('.swiper-container', {
		// Optional parameters
		direction: 'vertical',
		loop: true
	})
});
