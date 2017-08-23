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

$(".reg_dec").on('click', dec_reg_num);
$(".reg_add").on('click', add_reg_num);