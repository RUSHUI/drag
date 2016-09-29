
$(function(){
										//html element
	var doc = document,
		docEle = doc.documentElement,
		win    = window,
										//设计稿尺寸
		psdWidth = 1920,
		psdHeight = 1080,
										//窗口尺寸（包含滚动条，设定hidden 后 window.clientWidth == document.documentElement.clientWidth）
		winWidth = window.clientWidth,
		winHeight = window.clientHeight,//尺寸随窗口尺寸变化

										//文档尺寸大小（内容区宽度）
		docWidth = docEle.clientWidth,
		docHeight = docEle.clientHeight,//尺寸由内容高度决定

										//大小极值
		minWidth = 640, maxWidth = 1920,
		minHeight = 360, maxHeight = 1080,

		
        resize = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {        	

        	winWidth = window.clientWidth,
			winHeight = window.clientHeight,//尺寸随窗口尺寸变化

        	var winAspectRatio = winWidth / winHeight,
            var aspectRatio = doc.clientWidth/doc.clientHeight;

            if( +aspectRatio > psdWidth/psdHeight ){

                doc.style.fontSize = 100 * (window.clientHeight / 1080) + 'px';
                window.base = 100 * (window.clientHeight / 1080); 

            }else{
                docEl.style.fontSize = 100 * (window.clientWidth / 1920) + 'px';
                window.base = 100 * (window.clientWidth / 1920);  
            }
        };	    
	    window.addEventListener(resize, recalc, false);
	    doc.addEventListener('DOMContentLoaded', recalc, false);



	$(window).resize(function() {
        var scaleX = w / 1920, scaleY = h / 1080;
        var minX = 640 / 1920, minY = 360 / 1080;
        if (scaleX < minX || scaleY < minY) {
            $('body').css({
                overflow: 'scroll'
            })
            scaleX = minX
            scaleY = minY
        } else {
            $('body').css({
                overflow: 'hidden'
            })
        }
        this.scale = scaleX < scaleY ? scaleX : scaleY
        var $container = $('.container');
        $container.css('transform', 'scale(' + this.scale + ')' ;
        window.scale = this.scale;
    }).resize()
    $('.container').on('transitionend', function () {
        let width = $(window).width();
        let height = $(window).height()
        let $containerScale = $('.container');
        let marginLeft = (width - $containerScale.width() * window.scale) / 2,
            marginTop = (height - $containerScale.height() * window.scale) / 2
        if (marginLeft > 0) {
            $containerScale
                .css('margin-left', marginLeft)
            //.css('margin-top', marginTop)
        }
        callback($containerScale.width(), scale)
    });
	(function (doc, win) {
	    
	})(document, window);
	$(".container").Drag({
		selector:{
			drag:".drag-block"
		},//拖拽区
		callback:{
			mouseDown:function(){ console.log("mousedown") },
			mouseMove:function(){ console.log("mousemove") },
			mouseUp  :function(){ console.log("mouseup") }
		},
		scale:.8
	});



});