// JavaScript Document
function convertRemToPixels(rem) {
	return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

$(document).ready(function () {
	var $svg = $(".sidebar"),
		$canvas = $(".static"),
		$sideMenu = $(".slide-menu"),
		$path = $(".s-path"),
		$sCont = $(".sidebar-content"),
		$detail = $(".detail"),
		menuTop = 0,
		menuLeft = $sideMenu.offset().left,
		menuWidth = convertRemToPixels(13.5),
		windowWidth = $canvas.width(),
		diffX = 0,
		curX = 0,
		finalX = 0,
		frame = 1000 / 120,
		animTime = 200,
		sContTrans = 100,
		animating = false;

	var easings = {
		smallElastic: function (t, b, c, d) {
			var ts = (t /= d) * t;
			var tc = ts * t;
			return b + c * (33 * tc * ts + -106 * ts * ts + 126 * tc + -67 * ts + 15 * t);
		},
		inCubic: function (t, b, c, d) {
			var tc = (t /= d) * t * t;
			return b + c * (tc);
		}
	};

	$('.sidebar-content > li').click(function (event) {
		event.preventDefault(); //stop browser to take action for clicked anchor

		//get displaying tab content jQuery selector
		var active_tab_selector = $('.sidebar-content > li').attr('href');

		//find actived navigation and remove 'active' css
		var actived_nav = $('.sidebar-content > li.active');
		actived_nav.removeClass('active');

		// hide activated content
		var actived_content = $(actived_nav).attr('href');
		$(actived_content).removeClass('active');
		$(actived_content).addClass('hide');

		//add 'active' css into clicked navigation
		$(this).addClass('active');

		//hide displaying tab content
		$(active_tab_selector).removeClass('active');
		$(active_tab_selector).addClass('hide');

		//show target tab content
		var target_tab_selector = $(this).attr('href');
		$(target_tab_selector).removeClass('hide');
		$(target_tab_selector).addClass('active');
	});

	function createD(top, ax, dir) {
		return "M0,0 " + top + ",0 a" + ax + ",250 0 1," + dir + " 0,500 L0,500";
	}

	var startD = createD(50, 0, 1),
		midD = createD(125, 75, 0),
		//finalD = createD(200, 0, 1),
		finalD = createD(menuWidth, 0, 1),
		clickMidD = createD(windowWidth, 80, 0),
		clickMidDRev = createD(windowWidth - 100, 100, 1),
		clickD = createD(windowWidth, 0, 1),
		currentPath = startD;

	function newD(num1, num2) {
		var d = $path.attr("d"),
			num2 = num2 || 250,
			nd = d.replace(/\ba(\d+),(\d+)\b/gi, "a" + num1 + "," + num2);
		return nd;
	}

	function animatePathD(path, d, time, handlers, callback, easingTop, easingX) {
		var steps = Math.floor(time / frame),
			curStep = 0,
			oldArr = currentPath.split(" "),
			newArr = d.split(" "),
			oldLen = oldArr.length,
			newLen = newArr.length,
			oldTop = +oldArr[1].split(",")[0],
			topDiff = +newArr[1].split(",")[0] - oldTop,
			nextTop,
			nextX,
			easingTop = easings[easingTop] || easings.smallElastic,
			easingX = easings[easingX] || easingTop;

		$(document).off("mousedown mouseup");

		function animate() {
			curStep++;
			nextTop = easingTop(curStep, oldTop, topDiff, steps);
			nextX = easingX(curStep, curX, finalX - curX, steps);
			oldArr[1] = nextTop + ",0";
			oldArr[2] = "a" + Math.abs(nextX) + ",250";
			oldArr[4] = (nextX >= 0) ? "1,1" : "1,0";
			$path.attr("d", oldArr.join(" "));
			if (curStep > steps) {
				curX = 0;
				diffX = 0;
				$path.attr("d", d);
				currentPath = d;
				if (handlers) handlers1();
				if (callback) callback();
				return;
			}
			requestAnimationFrame(animate);
		}
		animate();
	}

	function handlers1() {
		$(".pullme").on("click", function () {
			animatePathD($path, finalD, animTime, false, function () {
				$sCont.addClass("active");
				setTimeout(function () {
					$(document).on("click", closeSidebar);
				}, sContTrans);
			});
			$(".pullme").hide();
		});

		$(document).on("mousedown touchstart", ".s-path", function (e) {
			var startX = e.pageX || e.originalEvent.touches[0].pageX;

			$(document).on("mousemove touchmove", function (e) {
				var x = e.pageX || e.originalEvent.touches[0].pageX;
				diffX = x - startX;
				if (diffX < 0) diffX = 0;
				if (diffX > 100) diffX = 100;
				curX = Math.floor(diffX / 2);
				$path.attr("d", newD(curX));
			});
		});

		$(document).on("mouseup touchend", function () {
			$(document).off("mousemove touchmove");
			if (animating) return;
			if (!diffX) return;
			if (diffX < 40) {
				animatePathD($path, newD(0), animTime, true);
			} else {
				animatePathD($path, finalD, animTime, false, function () {
					$sCont.addClass("active");
					setTimeout(function () {
						$(document).on("click", closeSidebar);
					}, sContTrans);
				});
				$(".pullme").hide();
			}
		});

	}

	handlers1();

	function closeSidebar(e) {
		if ($(e.target).closest(".sidebar-content").length ||
			$(e.target).closest(".detail").length) return;
		if (animating) return;
		animating = true;
		$sCont.removeClass("active");
		$detail.removeClass("active");
		$(".cloned").addClass("removed");
		finalX = -75;
		setTimeout(function () {
			animatePathD($path, midD, animTime / 3, false, function () {
				$detail.hide();
				$(".cloned").remove();
				finalX = 0;
				curX = -75;
				animatePathD($path, startD, animTime / 3 * 2, true);
				animating = false;
			}, "inCubic");
		}, sContTrans);
		$(document).off("click", closeSidebar);
		$(".pullme").show();
	}

	function moveImage(that) {
		var $img = $(that).find(".item__logo"),
			top = $img.offset().top - menuTop,
			left = 10 - menuLeft,
			$clone = $img.clone().addClass("cloned");

		$clone.css({
			top: top,
			left: left
		});
		$sideMenu.append($clone);
		$clone.css("top");
		$clone.css({
			top: "1.7rem",
			left: "78%",
		});
	}

	function ripple(elem, e) {
		var elTop = elem.offset().top,
			elLeft = elem.offset().left,
			x = e.pageX - elLeft,
			y = e.pageY - elTop;
		var $ripple = $("<div class='ripple'></div>");
		$ripple.css({
			top: y,
			left: x
		});
		elem.append($ripple);
	}

	$(document).on("click", ".sidebar-item", function (e) {
		if (animating) return;
		animating = true;
		$(document).off("click", closeSidebar);
		var that = this,
			name = $(this).find(".item__name").text();
		$(".detail__name").text(name);
		$(".detail__online").removeClass("active");
		ripple($(that), e);
		setTimeout(function () {
			$sCont.removeClass("active");
			moveImage(that);
			finalX = -80;
			setTimeout(function () {
				$(".ripple").remove();
				animatePathD($path, clickMidD, animTime / 3, false, function () {
					curX = -80;
					finalX = 0;
					animatePathD($path, clickD, animTime * 2 / 3, true, function () {
						$detail.show();
						$detail.css("top");
						$detail.addClass("active");
						animating = false;
					});
				}, "inCubic");
			}, sContTrans);
		}, sContTrans);
	});

	$(document).on("click", ".detail__back", function () {
		if (animating) return;
		animating = true;
		$detail.removeClass("active");
		$(".cloned").addClass("removed");
		setTimeout(function () {
			$(".cloned").remove();
			$detail.hide();
			finalX = 100;
			animatePathD($path, clickMidDRev, animTime / 3, false, function () {
				curX = 100;
				finalX = 0;
				animatePathD($path, finalD, animTime * 2 / 3, true, function () {
					$sCont.addClass("active");
					$(document).on("click", closeSidebar);
					animating = false;
				});
			}, "inCubic");
		}, sContTrans);
	});

	$(window).on("resize", function () {
		menuTop = $sideMenu.offset().top;
		menuLeft = $sideMenu.offset().left;
	});

});
