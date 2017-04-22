// 滑动滚动条
$(window).scroll(function() {
	// 滚动条距离顶部的距离 大于 200px时
	if ($(window).scrollTop() >= 126) {
		$('.personal_left').css('position', 'fixed');
		$('.personal_left').css('top', '0px');
		$('.personal_left').css('width', '25%');
		$('.personal_left').css('height', '100%');
	} else {
		$('.personal_left').css('position', 'static');
		$('.personal_left').css('width', '25%');
		$('.personal_left').css('height', '100%');
	}
});