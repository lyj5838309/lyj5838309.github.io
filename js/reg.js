// JavaScript Document
var num_reg = 1;

function add_reg_num() {
	num_reg++;
	$(".num_reg").text(num_reg);
}

function dec_reg_num() {
	num_reg--;
	if (num_reg < 0)
		num_reg = 0;
	$(".num_reg").text(num_reg);
}

function my_send_mail() {
	var msg = "邀请人：\t" + inviter_str + "\r\n" + "人数：\t" + num_reg;
	Email.send("hal9k1@126.com",
		"hal9k1@126.com",
		invitee_name_str,
		msg,
		{token: "501b3bdb-1055-4d06-95ff-99b45f8572b8"}
	);
}

$(".reg_dec").on('click', dec_reg_num);
$(".reg_add").on('click', add_reg_num);
var timeout_id = 0;
$('.image').on('mousedown touchstart', function () {
	timeout_id = setTimeout(my_send_mail, 1000);
}).bind('mouseup mouseleave touchend', function () {
	clearTimeout(timeout_id);
});
