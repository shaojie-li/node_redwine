define(['swiper'], function(swp) {
  return {

  	/**
  	 * [isIE 嗅探是否为IE浏览器，并获得IE版本]
  	 * @Author   shaojie.li
  	 * @DateTime 2017-10-19
  	 * @return   {Object}  [IE的版本]
  	 */
  	isIE: function(){
  		var ua = window.navigator.userAgent.toLowerCase();
  		var uaObj = ua.split(' ');
  		if(ua.indexOf('msie') > -1){
  			var start = ua.indexOf('msie'),
  					end = ua.indexOf('windows') - 2,
  					vs = parseInt(ua.substring(start, end).split(' ')[1]);
  			return {
  				vision: vs
  			};
  		} else{
  			return false;
  		}
  	},

  	/**
  	 * [swpFun 首页产品轮播]
  	 * @Author   shaojie.li
  	 * @DateTime 2017-10-18
  	 * @param    {[String]}   parentClass [父级类名]
  	 */
  	swpFun: function(parentClass){
      var itemLenGt1 = $(parentClass).find('.swiper-slide').length > 1;
			var newSwp = new swp(parentClass, {
				loop: true,
				autoplay : itemLenGt1 ? 3000 : false,
				calculateHeight : true,
				speed:600,
				autoplayDisableOnInteraction: false,
				onSlideChangeStart: function(swiper){

					var index = swiper.activeLoopIndex,
              $imgText = $(swiper.container).siblings('.img-text');

					$imgText.parent('.prod-img').siblings('.pagation-home').find('.pagation-box li').eq(index).addClass('on').
						siblings('li').removeClass('on');

        }

			});
  	},

  	/**
  	 * [popSwiper 首页产品弹出框包含swiper]
  	 * @Author   shaojie.li
  	 * @DateTime 2017-10-18
  	 * @param    {[String]}   parentId 		[父级ID名]
  	 * @param    {[String]}   parentClass [支持swiper的父级类名]
  	 */
  	prodSwiper: function(parentsId){
  		var $parents = $(parentsId),
  				$listItem = $parents.find('.item-list'),
  				$propItem = $parents.find('.prod-popup');

			var htmlList = $propItem.find('.swiper-wrapper').html();
      var itemLenGt1 = $propItem.find('.swiper-slide').length > 1;
  		$listItem.on('click', function(e){
  			var $this = $(this),
  					index = parseInt($this.attr('data-index')),
  					indexList = index + 1,
  					$popBox = $parents.find('.prod-popup'),
  				  $leftBtn = $popBox.find('.left'),
  					$rightBtn = $popBox.find('.right'),
  					$closeBtn = $popBox.find('.close'),
  					$listBox = $popBox.find('.swiper-wrapper'),
            $mask = $propItem.find('.pop-prod-box'),
  					listHtml = $listBox.html();
  					
  			$popBox.on('click', function(e){
  				e.stopPropagation();
  			});

  			$('html').addClass('overhide');
  			
  			$listBox.html(htmlList);

  			$popBox.show(0, function(){
  				var swiperClass = parentsId + ' .pop-prod-box .swiper-container',
              $swiperClass = $(swiperClass);
  				var newSwp = new swp(swiperClass, {
							loop: true,
							autoplay : false,
							calculateHeight : true,
							speed: 600,
              initialSlide: index,
							autoplayDisableOnInteraction: false
					});
          if(!itemLenGt1){
            $leftBtn.hide();
            $rightBtn.hide();
          }
					$leftBtn.on('click', function(e){
					    e.preventDefault();
					    e.stopPropagation();
					    itemLenGt1 && newSwp.swipePrev();
					});

					$rightBtn.on('click', function(e){
					    e.preventDefault();
					    e.stopPropagation();
					    itemLenGt1 && newSwp.swipeNext();
					});

					$closeBtn.on('click', function(e){
		  			e.stopPropagation();
		  			$('html').removeClass('overhide');
		  			$(this).parents('.prod-popup').css('display','none');
		  		});

          $mask.on('click', function(e){
            var ev = window.event || e;
            e.stopPropagation();
            if(ev.target.className !== 'pop-prod-box') return;
            $('html').removeClass('overhide');
            $(this).parents('.prod-popup').css('display','none');
          });
  			});

  		});
  	},

  	/**
  	 * [activePop 首页活动弹框swiper]
  	 * @Author   shaojie.li
  	 * @DateTime 2017-10-19
  	 * @param    {[String]}   parentClass [父级类名]
  	 */
  	activePop: function(parentClass){
  		var isIE = this.isIE();
  		var $parent = $(parentClass),
  				$navItem = $parent.siblings('.pagation-active').
						find('.pagation-item'),
					clientWidth = $(window).width(),
					listBox = $parent.find('.swiper-wrapper'),
          $mask = $parent.parents('.pop-ctn').siblings('.mask'),
					listHtml = listBox.html();
			if(isIE && (isIE.vision === 8)){
				$parent.parents('.cell-content').width(clientWidth*0.57);
			}

			$parent.parents('.item').find('.item-wrap').on('click', function(){
				$('html').addClass('overhide');
				listBox.html(listHtml);
				$parent.parents('.active-popup').show(0, function(){
					var newSwp = new swp(parentClass, {
						loop: true,
						autoplay : false,
						calculateHeight : true,
						speed:600,
						autoplayDisableOnInteraction: true,
						onSlideChangeStart: function(swiper){
							var index = swiper.activeLoopIndex;
							$(swiper.container).siblings('.pagation-active').
								find('.pagation-item').eq(index).addClass('on').
								siblings('li').removeClass('on');
					  }
					});
					$parent.parents('.pop-ctn').siblings('.close')
						.on('click', function(){
							$('html').removeClass('overhide');
							$parent.siblings('.pagation-active').
								find('.pagation-item').eq(0).addClass('on').siblings('.pagation-item').removeClass('on');
							$parent.parents('.active-popup').hide();
					});

					$navItem.on('click', function(){
						var index = $(this).index();
						newSwp.swipeTo(index);
					});

					$parent.find('.left').on('click', function(e){
						e.preventDefault();
						newSwp.swipePrev();
					});

					$parent.find('.right').on('click', function(e){
						e.preventDefault();
						newSwp.swipeNext();
					});

          $parent.parents('.active-popup').on('click', function(e){
            var ev = window.event || e;
            ev.stopPropagation();
            if(ev.target.className !== 'ctn-box') return;
            $('html').removeClass('overhide');
              $parent.siblings('.pagation-active').
                find('.pagation-item').eq(0).addClass('on').siblings('.pagation-item').removeClass('on');
              $parent.parents('.active-popup').hide();
          });

				});
			});
  	},
	
		/**
		 * [scrollTo 首页导航滚动]
		 * @Author   shaojie.li
		 * @DateTime 2017-10-18
		 * @param    {[String]}   navItem   [导航类名]
		 * @param    {[String]}   items     [内容模块类名]
		 * @param    {[Boolean]}  noFirst   [是否包含第一个导航栏目]
		 * @param    {[Number]}   distance  [自定义滚动距离]
		 * @param    {Boolean}  	hasShadow [是否显示阴影]
		 */
  	scrollTo: function(navItem, items, noFirst, distance, hasShadow) {
	    var ctns = $(items), scrollArr = [], scrTop = $('html, body').scrollTop(), $navItem = $(navItem);
	    if(hasShadow){
	    	if(scrTop !== 0){
				$navItem.parents('.g-header').addClass('hasShadow');
	    	}
	    }
	    for(var i = 0;i < ctns.length;i++){
				scrollArr.push($(ctns[i]).offset().top);
		  }
		  $navItem.on('click', function(){
				var index = noFirst ? $(this).index() - 1 : $(this).index();
				if(index < 0) return;
				$('html, body').animate({
					scrollTop: distance ? scrollArr[index] - distance : scrollArr[index]
				}, 400, function(){
					// 预留滚动到当前区域的动画处理
				})
	    });
	    $(document).on('scroll', function(){
	    	if(hasShadow){
				var scrTops = $('html, body').scrollTop();
		    	if(scrTops !== 0){
					$navItem.parents('.g-header').addClass('hasShadow');
		    	} else{
		    		$navItem.parents('.g-header').removeClass('hasShadow');
		    	}
	    	}
	    })
   	},

   	noticeToggle: function(parentClass){
   		var $parent = $(parentClass),
   				$ctnItem = $parent.find('.pop-list-item'),
   				$noticeList = $('.notice-list li');

   		$('.notice-wrap').find('.view-all').on('click', function(){
   			$parent.show();
   		});

   		$parent.find('.close').on('click', function(){
   			$parent.hide();
   			$ctnItem.removeClass('on');
   			$parent.find('.ctn-wrap').hide();
   		});

   		$noticeList.on('click', function(){
   			var index = $(this).index();
   			$parent.show(0, function(){
   				$ctnItem.eq(index).addClass('on').find('.ctn-wrap').slideDown('fast');
   			});
   		});

   		$ctnItem.find('.nav').on('click', function(){
   			var $this = $(this).parent('li');
   			$this.toggleClass('on');
   			$this.siblings('li').removeClass('on');
   			$this.siblings('li').find('.ctn-wrap').slideUp('fast');
   			$this.find('.ctn-wrap').slideToggle('fast', function(){
   				var hasOn = $this.hasClass('on');
   				if(hasOn){
   					var ctnHeight = $this.find('.ctn-wrap').height();
   					$this.find('.ctn-wrap').height(ctnHeight);
   				}
   			});
   		});
   	},

   	/**
  	 * [prodListPopup 产品列表弹出框包含swiper]
  	 * @Author   shaojie.li
  	 * @DateTime 2017-10-23
  	 * @param    {[String]}   parentId 		[父级ID名]
  	 */
  	prodListPopup: function(parentsId){
  		var $parents = $(parentsId),
  				$listItem = $parents.find('.list-item'),
  				popListArrHtml = [];

  		for(var i = 0;i < $listItem.length;i++){
  			var htmlList = $listItem.eq(i).find('.swiper-wrapper').html();
  			popListArrHtml.push(htmlList);
  		}

  		$listItem.bind('click', function(e){
  			var $this = $(this),
  				  $leftBtn = $this.find('.left'),
  					$rightBtn = $this.find('.right'),
  					$closeBtn = $this.find('.close'),
  					$listBox = $this.find('.swiper-wrapper'),
  					$popBox = $this.find('.pop-prod-box'),
  					listHtml = $listBox.html(),
  					index = $this.index(),
  					indexList = $this.index() + 1;
  					

  			$popBox.on('click', function(e){
  				e.stopPropagation();
  			});

  			$('html').addClass('overhide');
  			
  			$listBox.html(popListArrHtml[index]);

  			$this.find('.prod-popup').show(0, function(){
  				var swiperClass = '.pop-item-' + indexList;
  				var newSwp = new swp(swiperClass, {
							loop: true,
							autoplay : false,
							calculateHeight : true,
							speed:600,
							autoplayDisableOnInteraction: false
					});

					$leftBtn.on('click', function(e){
					    e.preventDefault();
					    e.stopPropagation();
					    newSwp.swipePrev();
					});

					$rightBtn.on('click', function(e){
					    e.preventDefault();
					    e.stopPropagation();
					    newSwp.swipeNext();
					});

					$closeBtn.on('click', function(e){
		  			e.stopPropagation();
		  			$('html').removeClass('overhide');
		  			$(this).parents('.prod-popup').css('display','none');
		  		});

  			});
  		});
  	},
    
    /* 日期格式话 xxxx-xx-xx */
    dateFormatForHome: function(){
      var $listItem = $('.active-wrap li');
      var $dateDom = $listItem.find('.pup-time em');
      for(var i = 0;i < $listItem.length;i++){
        
        var curDate = $listItem.eq(i).find('.pup-time em').text(),
            newDate = new Date(curDate),
            dateStr = '';
        var y = newDate.getFullYear(),
            m = newDate.getMonth() + 1,
            d = newDate.getDate();
        m = m < 10 ? '0' + m : m;
        d = d < 10 ? '0' + d : d;
        dateStr = y + '-' + m + '-' + d
        $listItem.eq(i).find('.pup-time em').text(dateStr);
      }
    },

    /* 导航菜单展示 */
    extMenu: function(){
      var $extBtn = $('.ext-icon'),
          $extCtn = $('.g-nav'),
          $gNavItem = $extCtn.find('li').not(':eq(0)');
      $extBtn.on('click', function(e){
        $extCtn.toggle('fast');
      });
      $gNavItem.on('click', function(e){
        $extCtn.hide('fast');
      })
    }
  }
});