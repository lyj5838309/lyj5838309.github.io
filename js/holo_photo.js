// JavaScript Document
var wrapper = document.getElementById("cardWrapper");
var card = document.getElementById("card");
var images = card.getElementsByTagName("img");
var isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i) ? true : false;
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i) ? true : false;
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i) ? true : false;
	},
	any: function () {
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
	}
};

function rotate(event) {
	var x = event.clientX;
	var y = event.clientY;
	var w = window.innerWidth;
	var h = window.innerHeight;
	var midpointX = w / 2;
	var midpointY = h / 2;
	var ypos = x - midpointX;
	var xpos = y - midpointY;
	var yval = ypos / midpointX * 20;
	var xval = xpos / midpointY * 20;
	var card = document.getElementById("card");
	card.style.transform =
		"perspective(550px) rotateY(" + yval + "deg) rotateX(" + xval + "deg)";

	for (var i = 1; i < images.length; ++i) {
		var myImg = images[i];
		myImg.style =
			"transform: perspective(550px) translateZ(" +
			myImg.getAttribute("data-depth") / myImg.clientHeight * 5000 +
			"px); left: " +
			yval * myImg.getAttribute("data-depth") * -1 / 20 +
			"%; top: " +
			xval * myImg.getAttribute("data-depth") / 20 +
			"%;";
	}
}

function handleOrientation(event) {
	var x = event.beta; // In degree in the range [-180,180]
	var y = event.gamma; // In degree in the range [-90,90]
	// Because we don't want to have the device upside down
	// We constrain the x value to the range [-90,90]
	if (x > 90) {
		x = 90
	};
	if (x < -90) {
		x = -90
	};
	// To make computation easier we shift the range of 
	// x and y to [0,180]
	x += 90;
	y += 90;
	var w = window.innerWidth;
	var h = window.innerHeight;
	var midpointX = w / 2;
	var midpointY = h / 2;
	var ypos = x - midpointX;
	var xpos = y - midpointY;
	var yval = ypos / midpointX * 20;
	var xval = xpos / midpointY * 20;
	var card = document.getElementById("card");
	card.style.transform =
		"perspective(550px) rotateY(" + yval + "deg) rotateX(" + xval + "deg)";

	for (var i = 1; i < images.length; ++i) {
		var myImg = images[i];
		myImg.style =
			"transform: perspective(550px) translateZ(" +
			myImg.getAttribute("data-depth") / myImg.clientHeight * 5000 +
			"px); left: " +
			yval * myImg.getAttribute("data-depth") * -1 / 20 +
			"%; top: " +
			xval * myImg.getAttribute("data-depth") / 20 +
			"%;";
	}
}

if (isMobile.any()) {
	document.addEventListener(
		'deviceorientation',
		function (event) {
			handleOrientation(event);
		},
		false
	);
} else {
	document.addEventListener(
		"mousemove",
		function (event) {
			rotate(event);
		},
		false
	);
}

/*
autoToggle.addEventListener("click", function () {
	if (!wrapper.classList.contains("auto")) {
		wrapper.classList.add("auto");
		toggle.innerHTML = "Click for pointer control";
		inst.innerHTML = "AUTO ANIMATION";
	} else {
		wrapper.classList.remove("auto");
		toggle.innerHTML = "Click for auto animation";
		inst.innerHTML = "POINTER CONTROL";
	}
});
*/
