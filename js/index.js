// 计算长度
function getLength(str) {
	// ASCII 码中，\x00-xff 为单字节
	return str.replace(/[^\x00-xff]/g, 'ss').length;
}

// 检验相同字符
function findStr(str, n) {
	var tmp = 0;
	for (var i = 0; i < str.length; i++) {
		if (str.charAt(i) === n) {
			tmp++;
		}
	}
	return tmp;
}

$(document).ready(function() {

	var ipt_username = $('.input-username')
		, hint_username = $('.hint-username')
		, ipt_pwd = $('.input-pwd')
		, hint_pwd = $('.hint-pwd')
		, ipt_pwd_confirm = $('.input-pwd-confirm')
		, hint_pwd_confirm = $('.hint-pwd-confirm')
		, name_length = 0
	;

	ipt_username.on('keyup', ukeyup);
	ipt_username.on('blur', ublur);
	ipt_pwd.on('keyup', pkeyup);
	ipt_pwd.on('blur', pblur);
	ipt_pwd_confirm.on('blur', pfblur);

	// 用户名
	// 字母/数字/下划线     /汉字
	//        \w        \u4e00-\u9fa5
	function ukeyup() {
		var count = $('#count');
		name_length = getLength(this.value);
		hint_username.html('请输入5-25个字符');
		count.css('visibility', 'visible');
		count.html(name_length + '个字符');
		if (name_length === 0) {
			count.css('visibility', 'hidden');
		}
	}

	function ublur() {
		var reg = /[^\w\u4e00-\u9fa5]/g;

		// 非法字符
		if (reg.test(this.value)) {
			hint_username.html('含有非法字符');
		}
		// 不得为空
		else if (this.value === '') {
			hint_username.html('不得为空');
		}
		// 字符长度 > 25
		else if (name_length > 25) {
			hint_username.html('长度不得超过25');
		}
		// 字符长度 < 6
		else if (name_length < 6) {
			hint_username.html('长度不得小于6');
		}
		else {
			hint_username.html('OK');
		}
	}

	// 密码
	function pkeyup() {
		var pwd_length = this.value.length;
		hint_pwd.html('请输入6-16个字符');
		if (pwd_length < 6) {
			$('.weak').addClass('active').siblings().removeClass('active');
		}
		else if(pwd_length >= 6 && pwd_length <= 10) {
			$('.medium').addClass('active').siblings().removeClass('active');
		}
		else if(pwd_length > 10) {
			$('.high').addClass('active').siblings().removeClass('active');
		}
	}

	function pblur() {
		var m = findStr(this.value, this.value[0]);
		var reg_d = /[^\d]/g;
		var reg_w = /[^a-zA-Z]/g;
		// 不能为空
		if (this.value === '') {
			hint_pwd.html('不能为空');
		}
		// 不能为相同字符
		else if (m === this.value.length) {
			hint_pwd.html('不能为相同字符');
		}
		// 长度6-16
		else if (this.value.length < 6 || this.value.length > 16) {
			hint_pwd.html('密码长度需要6-16个字符');
		}
		// 不能全为数字
		else if (!reg_d.test(this.value)) {
			hint_pwd.html('不能全为数字');
		}
		// 不能全为字母
		else if (!reg_w.test(this.value)) {
			hint_pwd.html('不能全为字母');
		}
		// OK
		else {
			hint_pwd.html('OK');
		}
	}

	// 确认密码
	function pfblur() {
		if (this.value != ipt_pwd.val()) {
			hint_pwd_confirm.html('两次输入密码不一致');
		}
		else {
			hint_pwd_confirm.html('OK');
		}
	}

	// 注册
	$('.signin-ipt').on('click', function() {
		if (this.checked === true) {
			$('.signin').attr('disabled', false);
		} else{
			$('.signin').attr('disabled', true);
		}
	});

	$('.signin').on('click', function() {
		alert('OK');
	})

});