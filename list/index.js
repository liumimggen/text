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
//动态渲染数据
(function() {
	var products = [
		{
			url: "<img src='../images/1216.jpg' >",
			price: 3599,
			name: "65M3 Pro（送腾讯季卡）",
			remark: "三重硬件护眼 全时AI3.0 金属全景屏 2+32GB",
			company: "创维-RGB电子有限公司",
			mark: "购物车",
			time: 0119,
			sales: 1232,
			// goodsUrl: '../detail/detail.html'
		},
		{
			url: "<img src='../images/1215.jpg' >",
			price: 2599,
			name: "55M3 Pro（送腾讯季卡）",
			remark: "三重硬件护眼 全时AI3.0 金属全景屏 2+32GB",
			company: "创维-RGB电子有限公司",
			mark: "购物车",
			time: 0123,
			sales: 7623,
			// goodsUrl: '../detail/detail.html'
		},
		{
			url: "<img src='../images/1214.jpg' >",
			price: 1359,
			name: "40H3",
			remark: "金属全景屏 光学防蓝光 清晰好画质",
			company: "创维-RGB电子有限公司",
			mark: "购物车",
			time: 0409,
			sales: 9872,
			// goodsUrl: '../detail/detail.html'
		},
		{
			url: "<img src='../images/1213.jpg' >",
			price: 1409,
			name: "32H3",
			remark: "金属全景屏 光学防蓝光 清晰好画质",
			company: "创维-RGB电子有限公司",
			mark: "购物车",
			time: 0812,
			sales: 9321,
			// goodsUrl: '../detail/detail.html'
		},
		{
			url: "<img src='../images/1212.jpg' >",
			price: 1549,
			name: "43H3",
			remark:"金属全景屏 光学防蓝光 清晰好画质",
			company: "创维-RGB电子有限公司",
			mark: "购物车",
			time: 0909,
			sales: 8723
			// goodsUrl: '../detail/detail.html'
		},
		{
			url: "<img src='../images/1211.jpg' >",
			price: 1409,
			name: "M3 32",
			remark:"金属全景屏 光学防蓝光 清晰好画质",
			company: "创维-RGB电子有限公司",
			mark: "购物车",
			time:0907,
			sales: 8912
			// goodsUrl: '../detail/detail.html'
		},
		{
			url: "<img src='../images/1210.jpg' >",
			price: 2199,
			name: "43A5 Pro（送游戏手柄+挂架）",
			remark: "Wi-Fi6 Pro 三重硬件护眼 远场声控3.0 无网投屏 金属全景屏",
			company: "创维-RGB电子有限公司",
			mark: "购物车",
			time: 1209,
			sales: 4321,
			// goodsUrl: '../detail/detail.html'
		},
		{
			url: "<img src='../images/1209.jpg' >",
			price: 4599,
			name: "75A3（整机三年保修）",
			remark: "四重硬件护眼 远场声控 金属全景屏 一键投屏",
			company: "创维-RGB电子有限公司",
			mark: "购物车",
			time: 0901,
			sales: 2356,
			// goodsUrl: '../detail/detail.html'
		},
		{
			url: "<img src='../images/1208.png' >",
			price: 5999,
			name: "75A5 Pro（送游戏手柄）",
			remark: "Wi-Fi6 Pro 四重硬件护眼 远场声控3.0 超大屏云游戏",
			company: "创维-RGB电子有限公司",
			mark: "购物车",
			time: 0607,
			sales: 4560
			// goodsUrl: '../detail/detail.html'
		},
		{
			url: "<img src='../images/1207.png' >",
			price: 199,
			name: "Swaiot云游戏手柄-畅玩版",
			remark: "腾讯START定制款 智能电视和PC都能使用 可变遥控器",
			company: "创维-RGB电子有限公司",
			mark: "购物车",
			time: 0204,
			sales: 5671
			// goodsUrl: '../detail/detail.html'
		},
		{
			url: "<img src='../images/1206.jpg' >",
			price: 6599,
			name: "65A50",
			remark: "S900旗舰处理器 4.5+128GB Ai升降摄像头 免遥控声控",
			company: "创维-RGB电子有限公司",
			mark: "购物车",
			time: 0605,
			sales: 3981,
			// goodsUrl: '../detail/detail.html'
		},
		{
			url: "<img src='../images/1205.jpg' >",
			price: 12999,
			name: "65R9U（送K歌套餐）",
			remark: "OLED自发光屏  升降式摄像头  全时Ai声控 3+64GB",
			company: "创维-RGB电子有限公司",
			mark: "购物车",
			time: 1209,
			sales: 8923,
			// goodsUrl: '../detail/detail.html'
		},
		{
			url: "<img src='../images/1204.jpg' >",
			price: 4599,
			name: "55A50",
			remark: "S900旗舰处理器 4.5+128GB Ai升降摄像头 免遥控声控",
			company: "创维-RGB电子有限公司",
			mark: "购物车",
			time: 1103,
			sales: 6712,
			// goodsUrl: '../detail/detail.html'
		},
		{
			url: "<img src='../images/1203.jpg' >",
			price: 7999,
			name: "55R9U（送K歌套餐）",
			remark: "OLED自发光屏  升降式摄像头  全时Ai声控 3+64GB",
			company: "创维-RGB电子有限公司",
			mark: "购物车",
			time: 1212,
			sales: 8768,
			// goodsUrl: '../detail/detail.html'
		},
		{
			url: "<img src='../images/1201.jpg' >",
			price: 12999,
			name: "75G71",
			remark: "高进光升降式Ai摄像头 JBL专业级前出音响",
			company: "创维-RGB电子有限公司",
			mark: "购物车",
			time: 0417,
			sales: 3272,
			// goodsUrl: '../detail/detail.html'
		}
	];
	function getProductHtml(key) {
		 liStr = `
			<li class="product-list">
				<span class="img">${key.url}</span>
				<span class="price">￥${key.price}</span>
				<span class="name">${key.name}</span>
				
				<span class="remark">${key.remark}</span>
				
				<span class="company">${key.company}</span>
				<img class="kefu" src='../images/客服.png'>
				<img class="che" src="../images/che.png" >
				<span class="mark">${key.mark}</span>
			</li>
		`;
		return liStr
	};
	//渲染到界面
		var htmlList = "";
		products.forEach(function(item) {
			htmlList += getProductHtml(item);
		});
		document.querySelector(".product-wrapper").innerHTML += htmlList;
	
	//综合排序
	document.querySelector(".all").onclick = function() {
		if(this.classList.contains("show")) return 
		document.querySelector(".synthesis li.show").classList.remove("show");
		this.classList.add("show");
		document.querySelector(".product-wrapper").innerHTML = "";
		products.sort(function(a, b) {
			return a.sales - b.sales;
		});
		var strList = "";
		products.forEach(function(item) {
			strList += getProductHtml(item);
		});
		document.querySelector(".product-wrapper").innerHTML += strList;
	}
	
	//销量上
	document.querySelector(".up").onclick = function() {
		if(this.classList.contains("show")) return
		document.querySelector(".synthesis li.show").classList.remove("show");
		this.classList.add("show");
		document.querySelector(".product-wrapper").innerHTML = "";
		products.sort(function(a, b) {
			return a.price - b.price;
		});
		var strList = "";
		products.forEach(function(item) {
			strList += getProductHtml(item);
		});
		document.querySelector(".product-wrapper").innerHTML += strList;
	}
	//销量下
	document.querySelector(".down").onclick = function() {
		if(this.classList.contains("show")) return
		document.querySelector(".synthesis li.show").classList.remove("show");
		this.classList.add("show");
		document.querySelector(".product-wrapper").innerHTML = "";
		products.sort(function(a, b) {
			return b.price - a.price;
		});
		var strList = "";
		products.forEach(function(item) {
			strList += getProductHtml(item);
		});
		document.querySelector(".product-wrapper").innerHTML += strList;
	}
	//上架时间
	document.querySelector(".time").onclick = function() {
		if(this.classList.contains("show")) return
		document.querySelector(".synthesis li.show").classList.remove("show");
		this.classList.add("show");
		document.querySelector(".product-wrapper").innerHTML = "";
		products.sort(function(a, b) {
			return b.time - a.time;
		});
		var strList = "";
		products.forEach(function(item) {
			strList += getProductHtml(item);
		});
		document.querySelector(".product-wrapper").innerHTML += strList;
	}
})();

