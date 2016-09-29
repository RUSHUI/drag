"use strict";
(function( $, win, doc, undefined ){

 
	 $.fn.Drag = function( ops ){


	 	var settings = $.extend({},$.fn.Drag.DEFAULTS.SETTINGS,ops);

	 	this.each(function(){

	 		var elm = $(this),instance = new drag(elm,settings); 
	 		elm.data("drag",instance); 	
	 	});

	 }

	 function drag(){

	 	//初始化数据
		this.dom = arguments[0]; 
	 	//配置是否正确
	 	this.settings = typeof arguments[1] !="object" ? false :
	 					typeof (arguments[1].selector.drag) != "string" ? false : arguments[1] ;
	 	if(!this.settings) {alert("请检查您的配置项")}
	 	this.init();
	 }

	 drag.prototype.init =  function(){

	 	this.dom.css({"position":"relative","overflow":"hidden"});
	 	this.dom.find(this.settings.selector.drag).css({"position":"position"}).addClass("cur-grab");

	 	this.regEvent();
	 	window.onresize=function(){
			this.event();
		}.bind(this);
	 };

	 drag.prototype.regEvent = function(){
	 	this.event();

	 };
	 drag.prototype.setScale=function(num){
	 	this.settings.scale = num;
	 	this.event();
	 };

	drag.prototype.event = function(){

		var settings =this.settings;
		var selector =settings.selector.drag;

		//缩放后外容器的left,top,width,height都根据缩放发生变化
		var wrapWidth = this.dom.width(),
			wrapHeight = this.dom.height(),
			wrapLeft = this.dom.offset().left/(settings.scale ? settings.scale : 1),
			wrapTop = this.dom.offset().top/(settings.scale ? settings.scale : 1);

		this.dom.off("mousedown");
		this.dom.on("mousedown",settings.selector.drag,{ths:this},function(e){
			e.stopPropagation();
			e.preventDefault();
			var outer = e.data.ths;

			var block = $(this);
			block.removeClass("cur-grab").addClass("cur-grabbing");
			outer.dom.find(settings.selector.drag).css("zIndex",1);
			block.css("zIndex",2);
			//拖拽对象块也被缩放，换算还原
			var width = block.width();
			var height = block.height();

			var left= block.offset().left/(settings.scale ? settings.scale : 1),
				top = block.offset().top/(settings.scale ? settings.scale : 1),

				maxLeft = wrapWidth - width,//确定极值
				maxTop 	= wrapHeight - height,
				minLeft = 0,
				minTop 	= 0 ;

			var prefix ={//鼠标位置到拖动块边缘的偏移值
				left:e.pageX/(settings.scale ? settings.scale : 1) - left,
				top: e.pageY/(settings.scale ? settings.scale : 1) - top
			}

			var ths  =this;
			settings.callback.mouseDown.call(this,e);

			document.onmousemove = function(e){

				e.stopPropagation();
				e.preventDefault();

				block.removeClass("cur-grabbing").addClass("cur-moving");

				var diffOffset ={//计算新的position
					left:e.pageX/(settings.scale ? settings.scale : 1) - wrapLeft - prefix.left,
					top: e.pageY/(settings.scale ? settings.scale : 1) - wrapTop - prefix.top
				};
				
				//确定极限
				if(diffOffset.left<minLeft){
					diffOffset.left=minLeft;
				}else if(diffOffset.left>maxLeft){
					diffOffset.left=maxLeft;
				}
				if(diffOffset.top<minTop){
					diffOffset.top=minTop;
				}else if(diffOffset.top>maxTop){
					diffOffset.top=maxTop;
				}
				

				block.css({
					left: diffOffset.left +"px",
					top: diffOffset.top + "px"
				});

				settings.callback.mouseMove.call(ths,e);

			}
			document.onmouseup = function(e){

				e.stopPropagation();
				e.preventDefault();
				block.removeClass("cur-moving").addClass("cur-grab");
				settings.callback.mouseUp.call(ths,e);

				document.onmousemove = null;
				document.onmouseup  =null;
			}
		})
	}
	$.fn.Drag.DEFAULTS={};
	$.fn.Drag.DEFAULTS.SETTINGS={

		selector:{
			drag:".drag-block"
		},//拖拽区
		callback:{
			mouseDown:function(){ console.log("mousedown") },
			mouseMove:function(){ console.log("mousemove") },
			mouseUp  :function(){ console.log("mouseup") }
		},
		scale:1	

	}

})(jQuery, window, document);
