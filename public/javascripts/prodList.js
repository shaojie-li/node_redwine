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
        $prodPopupList = $('#Js-prodlist-popup .list-item');

    c.prodListPopup('#Js-prodlist-popup');
})