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
//构造虚假购买数据
var cartList = [
	{id: 1, name: "50A5 Pro(送游戏手柄、挂架)", price: 2699, count: 1, maxCount: 5, introduction:"Wi-Fi6  Pro | 三重护眼 | 免遥控声控 | 2+32GB", delivery: "配送公司：创维-RGB电子有限公司", img: "../images/cart produ1.jpg"},
	{id: 2, name: "酷开冰箱BCD-CC185W典雅银", price: 1999, count: 1, maxCount: 5, introduction:"风冷三温区、无霜免解冻", delivery: "配送公司：酷开冰洗店", img: "../images/cart produce2.jpg"},

];
//1.动态渲染购物记录数据
var htmlStr = "";
cartList.forEach(function(item) {
	htmlStr += `
		<div class="cart-list-item" data-id="${item.id}">
			<input class="checkbox" type="checkbox">
			<div class="cart-left">
				<img src="${item.img}">
				<span>
					<h6><a href="">${item.name}</a></h6>
					<span>${item.introduction}</span>
					<span>${item.delivery}</span>
				</span>
			</div>
			<div class="cart-right">
				<div class="price-wrapper">
					￥<span class="price">${item.price}</span>.00
				</div>
				<div class="count-wrapper">
					<input data-id="${item.id}" class="btn-decrease" type="button" value="-" ${item.count === 1 ? "disabled" : ""}>
					<span class="count">${item.count}</span>
					<input data-id="${item.id}" data-max="${item.maxCount}" class="btn-increase" type="button" value="+" ${item.count === item.maxCount ? "disabled" : ""}>
				</div>
				<input data-id="${item.id}" class="btn-remove" type="button" value="移除商品">
			</div>
		</div>
	`;
});
document.querySelector(".cart-list").innerHTML = htmlStr;
//2.利用事件委托处理加减、删除、勾选
document.querySelector(".cart-list").onclick = function(e){
	// e.target获取触发事件的源对象
	if(e.target.classList.contains('btn-increase'))
		increaseHandler(e.target);
	else if(e.target.classList.contains('btn-decrease'))
		decreaseHandler(e.target);
	else if(e.target.classList.contains('btn-remove'))
		removeHandler(e.target);
	else if(e.target.classList.contains('checkbox'))
		checkboxChangeHandler(e.target);
	else
		return;
};
function increaseHandler(target) {
	var countSpan = target.parentNode.querySelector('span.count'),
			count = parseInt(countSpan.innerText);
			countSpan.innerText = count + 1;
			//让减号号取消禁用状态
		target.parentNode.querySelector('input.btn-decrease').disabled = false;
			// 更新好自身的状态
		target.disabled = count + 1 === parseInt(target.dataset.max);
			//更新cartList中的数据
		var id = parseInt(target.dataset.id);
		for(var i = 0; i < cartList.length; i++) {
			if(cartList[i].id === id) {
				cartList[i].count += 1;
				break;
			}
		}
		updataTotal();
	}

function decreaseHandler(target) {
	var countSpan = target.parentNode.querySelector('span.count'),
		count = parseInt(countSpan.innerText);
		countSpan.innerText = count - 1;
		//让加号取消禁用状态
	target.parentNode.querySelector('input.btn-increase').disabled = false;
		// 更新好自身的状态
	target.disabled = count - 1 === 1;
		//更新cartList中的数据
	var id = parseInt(target.dataset.id);
		for(var i = 0; i < cartList.length; i++) {
			if(cartList[i].id === id) {
				cartList[i].count -= 1;
				break;
			}
	};
	updataTotal();
}
function removeHandler(target) {
	if(!confirm("确定删除吗？")) return;
		var id = parseInt(target.dataset.id);
		var i = cartList.findIndex(function (item) {
			return item.id === id;
		});
		cartList.splice(i, 1);
		target.parentNode.parentNode.parentNode.removeChild(target.parentNode.parentNode);
		updataTotal();
	};

function checkboxChangeHandler(target) {
		target.classList.toggle("checked");
		var unchecked = document.querySelectorAll('.cart-list input.checkbox:not(.checked)')
		document.querySelector('input.checkbox.all').checked = unchecked.length === 0;
		document.querySelector('input.checkbox.all').classList.toggle("checked", unchecked.length === 0);
		updataTotal();
		}


document.querySelector('input.checkbox.all').onchange = function() {
	this.classList.toggle("checked");
	document.querySelectorAll('.cart-list input.checkbox').forEach(function(item) {
		item.checked = this.checked;
		item.classList.toggle("checked", this.checked);
	}, this);
	updataTotal();
}

//公共函数：更新总金额
function updataTotal() {
	var checkedBoxes = document.querySelectorAll('.cart-list input.checkbox.checked');
	var total = 0, id = 0, target = null;
	checkedBoxes.forEach(function(item) {
		id = parseInt(item.parentNode.dataset.id);
		target = cartList.find(function(item){
			return item.id === id;
		});
		total += target.price * target.count;
	});
	document.querySelector('span.total').innerText = total;
}

//结算
document.querySelector(".end").onclick = function() {
	if(Cookies.get("user") !== undefined) {
		window.location.href = "../order_confirm/index.html";
	} else {
		window.location.href = "../login/index.html";
	}
}