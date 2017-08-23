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

var invitee_str = urlParams.title + urlParams.name + urlParams.subtitle + urlParams.other;
var invitee_name_str = urlParams.name + urlParams.subtitle + urlParams.other;
var inviter_str = urlParams.inviter;

console.log(invitee_name_str);
console.log(invitee_str);
console.log(inviter_str);

$(".invitee").text(invitee_name_str);
$(".inviter").text(inviter_str);
