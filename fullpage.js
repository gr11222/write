setCss();
$('body').css('overflow','hidden');
var flag = 0,
$window = $(window);
function setCss(){
	var height = window.innerHeight+'px';
	$('.section').height(height);
}
window.onresize = setCss;
var startTime = 0;
var endTime = 0;
//添加此事件的命名空间  火狐的DOMMouseScroll
$window.on('mousewheel.a DOMMouseScroll.a',function(e){
	var startTime = new Date().getTime();
	var e = e||event;
	 var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta < 0 ? 1 : -1)) ||
    (e.originalEvent.detail && (e.originalEvent.detail < 0 ? -1 : 1));
	// var delta = event.detail || (-event.wheelDelta); 
	e.preventDefault();
	if((endTime-startTime)<-500){
		var $top = $window.scrollTop();
 		flag = parseInt($top/($('.section').height()));
		if(delta>0){
			flag++;
			if(flag>3){
				flag=3;
			}
		}
		else{
			flag--;
			if(flag<0){
				flag=0;
			}
		}
		var scorllY = flag*parseInt(($('.section').height())),
			$body = $('body,html');
			switch(flag){
				case 0: $body.stop(true,true).animate({'scrollTop': scorllY});
						// $('.section1').slideDown(1000).parent().siblings().css({'visibility':'none';});
						 break;
				case 1: $body.stop(true,true).animate({'scrollTop': scorllY});
						// $('.section2').slideDown(1000).parent().siblings().css({'visibility':'none';});
						break;
				case 2: $body.stop(true,true).animate({'scrollTop': scorllY});
						// $('.section3').slideDown(1000).parent().siblings().css({'visibility':'none';});
						 break;
				case 3: $body.stop(true,true).animate({'scrollTop': scorllY});
						// $('.section4').slideDown(1000).parent().siblings().css({'visibility':'none';});
						 break;
	}
 				endTime = new Date().getTime();
	}
});