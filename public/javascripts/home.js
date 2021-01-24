require.config({
    baseUrl: './javascripts',
    paths:{
        'jquery': 'libs/jquery',
		'swiper': 'libs/swiper',
	},
    shim:{
        /*'swiper': ['jquery']*/
    }
});

requirejs(['jquery', 'swiper', 'common'], function ($, swp, c){
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

	for(var i = 0;i < $activeItem.length;i++){
		var index = i + 1;
		c.activePop('.pop-swiper-' + index);
	}

	console.log('c', c)

	c.lazyload()

	c.scrollTo('.g-nav li','.scrollItem', true, headerHeight, true);
	
	c.noticeToggle('.notice-popup');
	
	c.dateFormatForHome();

	c.submitMessage();

	c.backTop('.side_nav .top');
});