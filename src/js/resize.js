(function($,win,doc){

	var docEle = doc.documentElement,
										//设计稿尺寸
		psdWidth = 1920,
		psdHeight = 1080,

										//屏幕中浏览器可用尺寸,尺寸随设备变化
		screenWidth = window.screen.availWidth,
		screenHeight = window.screen.availHeight,
										//文档尺寸，尺寸由内容决定（滚动条不包含在内，chrome54版下滚动条宽度17px） 尺寸随内容区尺寸变化（包括滚动未显示区）
		docWidth = docEle.offsetWidth,
		docHeight = docEle.offsetHeight,
										//视（窗）口尺寸,随resize变化的尺寸
		winWidth = docEle.clientWidth,
		winHeight = docEle.clientHeight,



										//极值
		minWidth = 640, maxWidth = 1920,
		minHeight = 360, maxHeight = 1080,

		psdAspectRatio = psdWidth / psdHeight,//设计稿宽高比
		winAspectRatio = winWidth / winHeight,//视口宽高比
		docAspectRatio = docWidth / docHeight,//内容宽高比（设定overflow：hidden后和视口保持一致）
		aspectRatio = winAspectRatio,
	    scale = 1;
	    docEle.style.overflow="hidden";//考虑我们项目做的文档的特点（内容保持在视口内，所以可禁止双方向滚动）
		docEle.style.height = "100%";//设置文档高度等于视口高度
		docEle.style.width = "100%"; //设置文档宽度等于视口宽度



	    var recalc = function () {

	 		//更新文档宽高
			docWidth = docEle.offsetWidth;
			docHeight = docEle.offsetHeight;
			//更新视（窗）口宽高
			winWidth = docEle.clientWidth;
			winHeight = docEle.clientHeight;

			docAspectRatio = docWidth / docHeight;//文档宽高比
			winAspectRatio = winWidth / winHeight;//视（窗）口宽高比

			if(winWidth<minWidth){
				$(document.body).width(minWidth);
			}
			if(winHeight<minHeight){
				$(document.body).height(minHeight);
			}
			if(docAspectRatio === winAspectRatio)
				console.log("文档根节点宽高与视口保持一致");
			else
				return console.log("文档宽高和视口宽高不一致了。。。");

			aspectRatio = winAspectRatio = docAspectRatio;//获取的视窗口宽高比

	        if( aspectRatio > psdAspectRatio ){//视口宽高比大于设计稿宽高比时，说明视口呈现比设计稿更矮胖型视口，应该以视口高度缩放比例进行缩放

	            // doc.style.fontSize = 100 * (window.clientHeight / 1080) + 'px';
	            // window.base = 100 * (window.clientHeight / 1080);
	            scale = winHeight/psdHeight;
	            if(winHeight>=minHeight){
	            	
	            	//$(this).css("height", minHeight/100 +"rem");
	            }

	        }else{//视口呈现瘦高型
	            // docEl.style.fontSize = 100 * (window.clientWidth / 1920) + 'px';
	            // window.base = 100 * (window.clientWidth / 1920);
	            scale = winWidth/psdWidth;
	            if(winWidth>=minWidth)//当宽度在正常范围波动时
	            {
	            	
	            	//$(this).width(winWidth );
	            }
	        }
	        $(this).css("transform","scale("+scale+")");
	        window.scale =scale;
	         $(this).css({
	         	"marginLeft":(winWidth-psdWidth*scale)/100/2 + "rem",
	         	"marginTop":(winHeight - psdHeight*scale)/100/2 + "rem"
	         });
	         $(this).trigger('ctn-resize',{scale:scale});

	    };
	$.fn.Resize=function(){		
	    var ths =this;
	    $(window).resize(function(){
	    	recalc.call(ths);
	    }).resize();
    	return this;
	}
	
})(jQuery,window,document);

