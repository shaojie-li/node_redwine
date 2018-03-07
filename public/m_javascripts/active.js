require.config({
    baseUrl: './m_javascripts',
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
    
    c.extMenu();

})