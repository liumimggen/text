//顶部
var head= document.querySelector('.header');
			var nowTop = document.documentElement.scrollTop || window.scrollYOffset || document.body.scrollTop;
			var headTop = nowTop + head.getBoundingClientRect().top;
			
			window.onscroll = function() {
				var scrollTop = document.documentElement.scrollTop || window.scrollYOffset || document.body.scrollTop;
			
				if(scrollTop > headTop)
				head.classList.add('fixed');
				else
				head.classList.remove('fixed');
			};
			