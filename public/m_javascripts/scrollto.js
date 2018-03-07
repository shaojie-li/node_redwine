define([], function() {
  	return function(navItem, items, noFirst, distance, hasShadow) {
	    var ctns = $(items), scrollArr = [], scrTop = $('html, body').scrollTop();
	    if(hasShadow){
	    	if(scrTop !== 0){
				$(navItem).parents('.g-header').addClass('hasShadow');
	    	}
	    }
	    for(var i = 0;i < ctns.length;i++){
			scrollArr.push($(ctns[i]).offset().top);
	    }
	    $(navItem).on('click', function(){
			var index = noFirst ? $(this).index() - 1 : $(this).index();
			if(index < 0) return;
			$('html, body').animate({
				scrollTop: distance ? scrollArr[index] - distance : scrollArr[index]
			}, 400, function(){
				
			})
	    });
	    $(document).on('scroll', function(){
	    	if(hasShadow){
				var scrTops = $('html, body').scrollTop();
		    	if(scrTops !== 0){
					$(navItem).parents('.g-header').addClass('hasShadow');
		    	} else{
		    		$(navItem).parents('.g-header').removeClass('hasShadow');
		    	}
	    	}
	    })
   }
});