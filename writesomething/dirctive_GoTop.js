myapp.directive('gotop',function(){
	return{
		restrict:"A",
		link: function (scope, element, attr) {  
                var e = $(element);  
                $(window).scroll(function () {                  
                    if ($(document).scrollTop() > 300)        
                        e.fadeIn(300);
                    else  
                        e.fadeOut(200);  
                });  
                e.click(function () {  
                    $('html, body').animate({               
                        scrollTop: 0  
                    }, 500);
                });  
	}
}
})