// JavaScript Document
$(".mygen").on('click', function () {
	var title = $('#DynamicValueAssignedHere').find('input[name="title"]').val();
	var name = $('#DynamicValueAssignedHere').find('input[name="name"]').val();
	var subtitle = $('#DynamicValueAssignedHere').find('input[name="subtitle"]').val();
	var other = $('#DynamicValueAssignedHere').find('input[name="other"]').val();
	var inviter = $('#DynamicValueAssignedHere').find('input[name="inviter"]').val();
	var mylink = "https://lyj5838309.github.io/index.html?&title=" + title + "&name=" + name + "&subtitle=" + subtitle + "&other=" + other + "&inviter=" + inviter;
	$(".gen_link").attr("href", mylink);
	$(".gen_link").text(mylink);
	$(".mylink").removeClass("hide");
	$(".mylink").addClass("active");
});