var doc = document,
	docEle = doc.documentElement,
	win    = window,
									//设计稿尺寸
	psdWidth = 1920,
	psdHeight = 1080,
									//屏幕中浏览器可用尺寸,尺寸随设备变化
	winWidth = window.screen.availWidth,
	winHeight = window.screen.availHeight,

									//文档尺寸，尺寸由内容决定（滚动条不包含在内，chrome54版下滚动条宽度17px）
	docWidth = docEle.clientWidth,
	docHeight = docEle.clientHeight,

									//大小极值
	minWidth = 640, maxWidth = 1920,
	minHeight = 360, maxHeight = 1080,

	psdAspectRatio = psdWidth / psdHeight,
	winAspectRatio = winWidth / winHeight,
	docAspectRatio = docWidth / docHeight,

	aspectRatio  = function(){

	},
	
    resize = 'orientationchange' in window ? 'orientationchange' : 'resize',

    recalc = function () {        	

    	
		//更新文档宽高
		docWidth = docEle.clientWidth;
		docHeight = docEle.clientHeight;

		psdAspectRatio = psdWidth / psdHeight;//设计稿宽高比
		winAspectRatio = winWidth / winHeight;//窗口宽高比，无滚动条时 winAspectRatio == docAspectRadio
		docAspectRatio = docWidth / docHeight;//文档宽高比


		if(doc.body.scrollHeight)
    	var aspectRatio = doc.clientWidth/doc.clientHeight;

        if( aspectRatio > psdWidth/psdHeight ){

            doc.style.fontSize = 100 * (window.clientHeight / 1080) + 'px';
            window.base = 100 * (window.clientHeight / 1080); 

        }else{
            docEl.style.fontSize = 100 * (window.clientWidth / 1920) + 'px';
            window.base = 100 * (window.clientWidth / 1920);  
        }
    };	    


    window.addEventListener(resize, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
