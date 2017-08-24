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
	var subj = "被邀请人：" + invitee_str;
	var msg = "邀请人：\t" + inviter_str + "\t******\t" + "人数：\t" + num_reg;
	Email.send("hal9k1@126.com",
		"hal9k1@126.com",
		subj,
		msg,
		{token: "501b3bdb-1055-4d06-95ff-99b45f8572b8"}
	);
	$(".image").removeClass("active");
	$(".image").addClass("hide");
	$(".thankyou").removeClass("hide");
	$(".thankyou").addClass("active");
	$(".reg_dec").addClass("hide");
	$(".reg_add").addClass("hide");
	my_thank_you();
}

$(".reg_dec").on('click', dec_reg_num);
$(".reg_add").on('click', add_reg_num);
var timeout_id = 0;
$('.image').on('mousedown touchstart', function () {
	timeout_id = setTimeout(my_send_mail, 500);
}).bind('mouseup mouseleave touchend', function () {
	clearTimeout(timeout_id);
});
