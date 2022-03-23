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
//地址管理
var addresses = [
	{id: 1, user: "lisi", receiveName: "李四", receivePhone: "13466666666", receiveRegion: "山东省 青岛市 城阳区 城阳街道", receiveDetail: "金日紫都-1", isDefault: true},
	{id: 3, user: "lisi", receiveName: "李四朋友", receivePhone: "13466666666", receiveRegion: "山东省 青岛市 城阳区 城阳街道", receiveDetail: "金日紫都-2", isDefault: false},
	{id: 6, user: "lisi", receiveName: "李四同学", receivePhone: "13466666666", receiveRegion: "山东省 青岛市 城阳区 城阳街道", receiveDetail: "金日紫都-3", isDefault: false}
];

(function() {
	//1.动态拼接ul内容
	 var user = "lisi";
	 var htmlStr = "";
	 addresses.filter(function(item) {return user === user}).forEach(function(item) {
		htmlStr += getAddressHtml(item);
	 });
	document.querySelector('ul.address-list').innerHTML += htmlStr;
	// 2.给ul绑定点击事件
	document.querySelector('ul.address-list').onclick = function(e) {
		if(e.target.classList.contains('btn-remove'))
			removeHandler(e.target);
		else if(e.target.classList.contains('btn-add'))
			beginAddHandler();
		else if(e.target.classList.contains('btn-modify'))
			beginModifyHandler(e.target);
		else if(e.target.classList.contains('btn-default'))
			defaultHandler(e.target);
		else 
			return;
	};
	function removeHandler(target) {
		if(!confirm("是否删除？")) return;
		var id = parseInt(target.parentNode.parentNode.dataset.id);
		var i = addresses.findIndex(function(item) { return item.id === id});
		addresses.splice(i ,1);
		target.parentNode.parentNode.parentNode.removeChild(target.parentNode.parentNode);
		alert('删除成功！');
	}
	function beginAddHandler() {
		var form = document.forms["addressEdit"];
		form.reset();
		regionPicker.reset();
		form["id"].value = 0;
		document.querySelector('.edit-dialog-wrapper').classList.add('show');
	}
	function beginModifyHandler(target) {
		var id = parseInt(target.parentNode.parentNode.dataset.id);
		var address = addresses.find(function(item) { return item.id === id; });
		var form = document.forms["addressEdit"];
		form["id"].value = address.id;
		form["receiveName"].value = address.receiveName;
		form["receivePhone"].value = address.receivePhone;
		form["receiveDetail"].value = address.receiveDetail;
		regionPicker.set(address.receiveRegion);
		document.querySelector('.edit-dialog-wrapper').classList.add('show');
		}
	function defaultHandler(target) {
		var id = parseInt(target.parentNode.parentNode.dataset.id);
		
		var curDefault = addresses.find(function(item) {return item.user === user && item.isDefault; })
		if(curDefault !== undefined) curDefault.isDefault = false;
		addresses.find(function(item) {return item.id === id }).isDefault = true;
		
		
		var curDefaultDom = document.querySelector('.is-default');
		if(curDefaultDom !== null) curDefaultDom.classList.remove('is-default');
		target.parentNode.classList.add('is-default');
		
		document.querySelector('li.sign').classList.remove('sign');
		target.parentNode.parentNode.classList.add('sign');
		
		alert("默认地址修改成功")
	}
	
	function getAddressHtml(address) {
		liStr = `
			<li data-id="${address.id}">
				<span class="name">${address.receiveName}</span>
				<span class="phone">${address.receivePhone}</span>
				<span class="region">${address.receiveRegion} ${address.receiveDetail}</span>
				<span class="default-wrapper ${address.isDefault ? 'is-default' : ''}">
					<img class="mark" src="../images/定位.png" >
					<span class='default-address'>默认地址</span>
					<input class="btn-default" type="button" value="设为默认地址">
				</span>
				<span class="btn">
					<img class="btn-modify" src="../images/修改.png" >
					<img class="btn-remove" src="../images/删%20除.png" >
				</span>
			</li>
		`;
		
		return liStr
	}
	
	//表单取消按钮
	document.querySelector('.btn-cancel').onclick = function() {
		document.querySelector('.edit-dialog-wrapper').classList.remove('show');
	}
	//表单确定按钮
	document.querySelector('.btn-ok').onclick = function() {
		var form = document.forms["addressEdit"];
		var address = {
			id: parseInt(form["id"].value),
			receiveName: form["receiveName"].value.trim(),
			receivePhone: form["receivePhone"].value.trim(),
			receiveRegion: regionPicker.get(),
			receiveDetail: form["receiveDetail"].value.trim()
		};
		if(address.id === 0) {
			address.id = addresses[addresses.length - 1].id + 1;
			address.isDefault === false;
			addresses.push(address);
			
			document.querySelector('ul.address-list').innerHTML += getAddressHtml(address);
		}else {
			var i = addresses.findIndex(function(item) { return item.id === address.id });
			address.isDefault = addresses[i].isDefault;
			addresses.splice(i, 1, address);
			
			var li = document.querySelector(`li[data-id='${address.id}']`);
			li.querySelector('span.name').innerHTML = address.receiveName;
			li.querySelector('span.phone').innerHTML = address.receivePhone;
			li.querySelector('span.region').innerHTML = `${address.receiveRegion} ${address.receiveDetail}`;
			
		};
		document.querySelector('.edit-dialog-wrapper').classList.remove('show');
	}
})();

// 发票点击选择
function toggle() {
	if(this.checked) {
		document.querySelector(".information-item img.show").classList.remove("show");
		document.querySelectorAll(".information-item img")[this.index].classList.add("show");
	}
	
};

var buttons = document.querySelectorAll('.edit-dialog-text>input.information');
for(var i = 0; i <buttons.length; i++) {
	buttons[i].index = i;
	buttons[i].onclick = toggle;
}
//
document.querySelector(".price-total button").onclick = function() {
	location.replace('../pay/index.html');
}