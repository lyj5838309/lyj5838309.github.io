// JavaScript Document
var urlParams;
(window.onpopstate = function () {
	var match,
		pl = /\+/g, // Regex for replacing addition symbol with a space
		search = /([^&=]+)=?([^&]*)/g,
		decode = function (s) {
			return decodeURIComponent(s.replace(pl, " "));
		},
		query = window.location.search.substring(1);

	urlParams = {};
	while (match = search.exec(query))
		urlParams[decode(match[1])] = decode(match[2]);
})();

var invitee_str = "";
var invitee_name_str = "";
var inviter_str = "";
invitee_str += urlParams.title + urlParams.name + urlParams.subtitle + urlParams.other;
invitee_name_str += urlParams.name + urlParams.subtitle + urlParams.other;
inviter_str += urlParams.inviter;

if (invitee_name_str !== "NaN") {
	$(".invitee").text(invitee_str);
	$(".inviter").text(inviter_str);
	$(".invitee_name").text(invitee_name_str);
} else {
	$(".taitou").text("");
	$(".luokuan").text("戴望州 刘雅静 敬邀");
	$(".invitee_name").text("");
}
