// 登录
document.querySelector('input.btn-login').onclick = function () {
	var name = document.querySelector('input.login-name').value.trim();
	var pwd = document.querySelector('input.login-pwd').value;
	if(name.length === 0 || pwd.length === 0 ) {
		alert("用户名和密码不能为空");
		return;
	}
	if(name === "user" && pwd === "123") {
		Cookies.set("user", name);
		console.log(document.referrer)
		if(document.referrer === "http://127.0.0.1:8848/chuangwei/register/index.html") {
			window.location.href = "../home/index.html"
		} else {
			window.history.back(-1);
		}
		
		
	} else {
		alert('用户名或密码错误')
	}
}
