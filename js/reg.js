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

function send_mail() {
	var msg = "邀请人：" + inviter_str + "\n";
	msg += num_reg.toString;
	Email.send("hal9k1@126.com",
		"hal9k1@126.com",
		invitee_name_str,
		msg, {
			token: "1b6838a0-dd81-4e74-9e2a-8b2a79c58fbe"
		});
}

$(".reg_dec").on('click', dec_reg_num);
$(".reg_add").on('click', add_reg_num);

$(".image").on('click', send_mail);
