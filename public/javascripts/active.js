require.config({
    baseUrl: './javascripts',
    paths:{
        'jquery': 'libs/jquery',
        'swiper': 'libs/swiper'
    },
    shim:{
        /*'swiper': ['jquery']*/
    }
});

requirejs(['jquery', 'swiper', 'common'], function ($, swp, c){

	var isIE = c.isIE(), 
		isIE8 = !!isIE && isIE.vision === 8,
        $activeItem = $('.active-wrap .item');

    for(var i = 0;i < $activeItem.length;i++){
        var index = i + 1;
        c.activePop('.pop-swiper-' + index);
    }
    
    console.log('isIE8', isIE8);
})