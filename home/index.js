//顶部
var head= document.querySelector('.header');
var nowTop = document.documentElement.scrollTop || window.scrollYOffset || document.body.scrollTop;
var headTop = nowTop + head.getBoundingClientRect().top;
var returnTop = document.querySelector(".return-top"), timer = null;

window.onscroll = function() {
	//顶部固定定位
	var scrollTop = document.documentElement.scrollTop || window.scrollYOffset || document.body.scrollTop;
	if(scrollTop > headTop)
	head.classList.add('fixed');
	else
	head.classList.remove('fixed');
	//出现返回顶部按钮
	var nowTop = document.documentElement.scrollTop || window.scrollYOffset || document.body.scrollTop;
	if(nowTop >= headTop){
		returnTop.style.transition = "0.5s";
		returnTop.classList.add("nav-show");
	}else {
		returnTop.style.transition = "0.5s";
		returnTop.classList.remove("nav-show");
	}
};
//返回顶部
(function() {
	//返回顶部过程中动了鼠标滚轮就停止
	document.onmousewheel = function() {
		if(timer !== null) {
			clearInterval(timer);
			timer = null;
		};
	};
	//返回顶部
	document.querySelector(".return-top").onclick = function() {
		timer = setInterval(function() {
			var nowTop = document.documentElement.scrollTop ||window.scrollYOffset || document.body.scrollTop 
			var distance = Math.ceil(nowTop / 10);
			if(nowTop <= 5) {
				clearInterval(timer);
				timer = null;
				window.scrollTo(0, 0);
				return;
				
			}
			window.scrollTo(0, nowTop - distance);
		}, 10);
	};
})();
// banner轮播
var index = 1; //标识轮播图当前第几张处于显示状态  (非常关键)
var timer = null;
var isToggling = false;//标识轮播图当前是否正处于toggle切换过渡中
var length = document.querySelectorAll('ul.slider-wrapper li').length;
function bannerToggle(nextIndex) {
	index = nextIndex;
	isToggling = true;
	var scrollDom = document.querySelector('.slider-wrapper');
	// index = (index + 1) % scrollDom.children.length;
	scrollDom.style.transitionDuration = "0.4s";
	scrollDom.style.left = `-${nextIndex}00%`;
	//控制指示器的切换
	document.querySelector('.indicator-wrapper span.active').classList.remove('active');
	var i = index;
	if(i === length - 1) i = 1;
	else if(i === 0) i = length - 2;
	document.querySelectorAll('.indicator-wrapper span')[i - 1].classList.add('active');
//每次toggle过渡完成的收尾工作
	setTimeout(function() {
		if(nextIndex === length - 1) {
			index = 1;
			scrollDom.style.transitionDuration = "0s";
			scrollDom.style.left = `-${index}00%`;
			}
		if(nextIndex === 0) {
			index = length - 2;
			scrollDom.style.transitionDuration = "0s";
			scrollDom.style.left = `-${index}00%`;
			}
		isToggling = false;
	}, 400)
}
//开始自动轮播
timer = setInterval(function() { bannerToggle(index + 1);
}, 3000);
//鼠标划入banner停止自动轮播
document.querySelector('.banner').onmouseover = function() {
	clearInterval(timer);
	timer = null;
};
//鼠标划出banner 恢复自动轮播
document.querySelector(".banner").onmouseout = function() {
	timer = setInterval(function() { bannerToggle(index + 1);
	}, 3000);
}
//给小耳朵绑定点击事件
document.querySelector('.btn-prev').onclick = function() {
	if(isToggling) return;
	bannerToggle(index - 1);
};
document.querySelector('.btn-next').onclick = function() {
	if(isToggling) return;
	bannerToggle(index + 1);
};
//indicator 绑定点击事件 控制轮播图指定切换
document.querySelectorAll('.indicator-wrapper span').forEach(function(item, i) {
	item.index = i + 1;
	item.onclick = function() {
		if(this.classList.contains('active ') || isToggling) return;
		bannerToggle(this.index);
	}
});

