require.config({
    baseUrl: '/m_javascripts',
    paths:{
        'jquery': '/m_javascripts/libs/jquery',
		'swiper': '/m_javascripts/libs/swiper',
		'lazyload': 'libs/jquery.lazyload'
	},
    shim:{
        /*'swiper': ['jquery']*/
    }
});

requirejs(['jquery', 'swiper', 'common', 'lazyload'], function ($, swp, c){
	var headerHeight = $('.g-header').outerHeight(),
			$prodItem = $('.red-wine .prod-item'),
			$activeItem = $('.active-wrap .item');

  	var mySwiper1 = new swp('.swiper-container', {
		loop: true,
		autoplay : 3000,
		calculateHeight : true,
		speed:600,
		autoplayDisableOnInteraction: false
	});

	for(var i = 0;i < $prodItem.length;i++){
		var index = i + 1;
		c.swpFun('.prod-item-' + index);
		c.prodSwiper('#prod-item-' + index);
	}

	var imgArr = [], img = [], flag = 0;
	$('.main-content img').each(function(index, el) {
		imgArr.push(el.src);
	});
	var newArray = c.uniqueArray(imgArr);
	for(var i = 0 ; i < newArray.length ; i++){
	    img[i] = new Image();
	    img[i].src = newArray[i];
	    img[i].onload = function(){
	       //第i张图片加载完成
	       flag++;
	       // document.title = Math.round(flag/newArray.length*100) + '%';
	       if(flag == newArray.length){
	          //全部加载完成
	          c.scrollTo('.g-nav li','.scrollItem', true, headerHeight, true);
	       }
	    }
	}

	c.lazyload()

	c.noticeToggle('.notice-popup');
	
	c.dateFormatForHome();

	c.extMenu('.home-page');

	c.submitMessage();
});