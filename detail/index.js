var versionSpans = document.querySelectorAll(".version-item");
function versionToggle() {
	if(this.classList.contains("active")) return;
	this.parentNode.querySelector(".active").classList.remove("active");
	this.classList.add("active");
}
for(var i = 0; i < versionSpans.length; i++) {
	versionSpans[i].index = i;
	versionSpans[i].onclick = versionToggle;
}

// 加减号
var countSpan = document.querySelector(".count");

var decreaseBtn = document.querySelector('.btn-decrease')
decreaseBtn.onclick = function() {
	if(countSpan.innerText == 1) {
		alert("更新数据失败");
		return;
	}

	var count = parseInt(countSpan.innerText);
		countSpan.innerText = count - 1
}
var increaseBtn = document.querySelector('.btn-increase')
increaseBtn.onclick = function() {
	var count = parseInt(countSpan.innerText);
		countSpan.innerText = count + 1
}
//猜你喜欢顶部
var head= document.querySelector('.other-title');
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
	
// 猜你喜欢部分

var lis = document.querySelectorAll(".other-title>ul>li");
function liToggle() {
	if(this.classList.contains("change")) return;
	this.parentNode.querySelector(".change").classList.remove("change");
	this.classList.add("change");
	
	document.querySelector(".other-container.show").classList.remove("show");
	document.querySelectorAll(".other-container")[this.index].classList.add("show");
}


for(var i = 0; i < lis.length; i++) {
	lis[i].index = i;
	lis[i].onclick = liToggle;
}
// 放大镜底部
var index = 0;
var bannerToggle = document.querySelector(".banner-toggle")

document.querySelector('.toggle-left').onclick = function() {
	if(index < 0)
	index = index + 7
	bannerToggle.style.transitionDuration = "0.4s";
	document.querySelector('.banner-toggle').style.left = `${index}0px`;
	
}
document.querySelector('.toggle-right').onclick = function() {
	if(index > -35)
	index = index - 7
	bannerToggle.style.transitionDuration = "0.4s";
	document.querySelector('.banner-toggle').style.left = `${index}0px`;
	
}

// 放大镜图片 下联动上
var	imgs = document.querySelectorAll(".banner-container img");
function imgToggle() {
	if(this.classList.contains('fun')) return;
	document.querySelector(".banner-container img.fun").classList.remove("fun");
	this.classList.add("fun")
	
	document.querySelector(".photo img.show").classList.remove('show');
	document.querySelectorAll(".photo img")[this.index].classList.add('show');
	
	document.querySelector(".zoom-big").style.backgroundImage = `url(${this.src})`;
}
for(var i = 0; i < imgs.length; i++) {
	imgs[i].index = i;
	imgs[i].onmouseover = imgToggle;
};
//放大镜放大

(function() {
	var zoomMask = document.querySelector('.zoom-mask'),
		zoomMaskW = 0, zoomMaskH = 0;
		zoomBig = document.querySelector('.zoom-big'),
		zoom = document.querySelector('.zoom'),
		zoomBorderWidth = 0,
		zoomW = 0,          	// 此时无法确定，要等图片渲染完
		zoomH = 0,           	// 此时无法确定，要等图片渲染完
		maxLeft = 0,   			// 此时无法确定，要等图片渲染完
		maxTop = 0,    			// 此时无法确定，要等图片渲染完
		zoomRatio = 2; 			// 放大镜放大的比例(正好是大的放大比例，小的缩小比例)
	// 初始化放大镜
	function initZoom(img) {}
	// 图片加载完毕，动态初始化确定放大镜zoom的覆盖范围
	document.querySelector('.photo img').onload = function() { 
		console.log(this)
		console.log('换图片了');
		document.querySelector('.zoom-all').style.width = this.width + "px";
		document.querySelector('.zoom-all').style.height = this.height + "px";
		zoom.style.width = `${this.width / zoomRatio}px`;
		zoom.style.height = `${this.height / zoomRatio}px`;
		zoom.style.backgroundSize = `${this.width}px ${this.height}px`;
		zoomW = this.width / zoomRatio;
		zoomH = this.height / zoomRatio;
		maxLeft = this.width - zoomW;
		maxTop = this.height - zoomH;
		
		zoomBig.style.backgroundSize = `${this.width * zoomRatio}px ${this.height * zoomRatio}px`;
		
		zoomMaskW = this.width;
		zoomMaskH = this.height;
	};

	zoomMask.onmousemove = function(e) {
		var x = e.offsetX - zoomW / 2, y = e.offsetY - zoomH / 2;
		if(x < 0 ) x = 0;
		if(x > maxLeft) x = maxLeft;
		if(y < 0) y = 0;
		if(y > maxTop) y = maxTop;
		zoom.style.left = `${x - zoomBorderWidth}px`;
		zoom.style.top = `${y - zoomBorderWidth}px`;
		zoom.style.backgroundPosition = `-${x}px -${y}px`;
		zoomBig.style.backgroundPosition = `-${x * zoomRatio}px -${y * zoomRatio}px`;
	};
})();