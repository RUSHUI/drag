"use strict";
(function( $, win, doc, undefined ){

 
	 $.fn.DragDrop = function( ops ){


	 	var settings = $.extend({},$.fn.Drag.DEFAULTS.SETTINGS,ops);

	 	this.each(function(){

	 		var elm = $(this),instance = new dragDrop(elm,settings); 
	 		elm.data("dragDrop",instance); 	
	 	});

	 }

	 function dragDrop(){
	 	
	 	//初始化数据
		// this.dom = arguments[0]; 
		 // 	//配置是否正确
		 // 	this.settings = typeof arguments[1] !="object" ? false :
		 // 					typeof (arguments[1].selector.drag) != "string" ? false : arguments[1] ;
		 // 	if(!this.settings) {alert("请检查您的配置项")}
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

	drag.prototype.event = function(){
		var settings =this.settings;
		var selector =settings.selector.drag;		
	}
	$.fn.Drag.DEFAULTS={};
	$.fn.Drag.DEFAULTS.SETTINGS={

		selector:{
			drag:".drag-block"
		},//拖拽区
		callback:{
			dragstart:function(){ console.log("dragstart") },	//开始拖对象时触发									目标：被拖动对象
			dragenter:function(){ console.log("dragenter") },	//当对象第一次被拖动到目标对象上时触发，同时表示该目标对象允许‘放’这动作 目标：目标对象
			dragover  :function(){ console.log("dragover") },	//当对象拖动到目标对象时触发 						目标：当前目标对象
			dragleave:function(){ console.log("dragleave") },	//在拖动过程中，当被拖动对象离开目标对象时触发		目标：当前目标对象
			drag:function(){ console.log("drag") },				//每次当对象被拖动时就会触发						目标：被拖动对象
			drop  :function(){ console.log("drop") },			//当发生“放”这动作时触发							目标：当前目标对象
			dragend:function(){ console.log("dragend") }		//在拖放过程，松开鼠标时触发  						目标：被拖动对象
		},
		scale:.8	

	}

})(jQuery, window, document);
