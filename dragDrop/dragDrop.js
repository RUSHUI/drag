"use strict";
(function( $, win, doc, undefined ){


	 $.fn.DragDrop = function( ops ){


	 	var settings = $.extend({},$.fn.DragDrop.DEFAULTS.SETTINGS,ops);

	 	this.each(function(){

	 		var elm = $(this),instance = new dragDrop(elm,settings);
	 		elm.data("dragDrop",instance);
	 	});

	 }

	 function dragDrop(){

	 	//初始化数据
		 this.dom = arguments[0];
		 // 	//配置是否正确
		 	this.settings = typeof arguments[1] !="object" ? false :
		 					typeof (arguments[1].selector.drag) != "string" ? false : arguments[1] ;
		 	if(!this.settings) {alert("请检查您的配置项")}
	 	this.init();
	 }

	 dragDrop.prototype.init =  function(){

	 	this.dom.css({"position":"relative","overflow":"hidden"});
	 	this.dom.find(this.settings.selector.drag).attr("draggable",true);

	 	this.regEvent();
	 };

	 dragDrop.prototype.regEvent = function(){

		var settings =this.settings;
		var selector =settings.selector.drag;
    /*this.dom.off("mousedown mouseover mousemove mouseup click mouseout",
                settings.selector.drag);
    this.dom.on("mousedown mouseover mousemove mouseup click mouseout",
                settings.selector.drag,function(e){
                  console.log("事件类型:"+ e.type+"======"+this.dataset.id);
                });//由于开启了draggable,mouseup和mousedown事件失效,测试如上*/
    this.dom.on("dragstart",settings.selector.drag,function(e){
      //通过这种方式传递拖拽元素信息给拖放元素然后处理拖放逻辑
      //e.originalEvent.dataTransfer.setData('text/plain', "this is block "+this.dataset.id);
      settings.callback.dragstart && settings.callback.dragstart.call(this,e);
    });
    this.dom.on("dragenter",settings.selector.drop,function(e){//在drop上触发的事件
      settings.callback.dragenter && settings.callback.dragenter.call(this,e);
    });
    this.dom.on("dragover",settings.selector.drop,function(e){//在drop上触发的事件
      e.preventDefault();
      e.stopPropagation();
      settings.callback.dragover && settings.callback.dragover.call(this,e);
    });
    this.dom.on("dragleave",settings.selector.drop,function(e){//在drop上触发的事件
      settings.callback.dragleave && settings.callback.dragleave.call(this,e);
    });
    this.dom.on("drag",settings.selector.drag,function(e){//在drag上触发的事件
      settings.callback.drag && settings.callback.drag.call(this,e);
    });
    this.dom.on("drop",settings.selector.drop,function(e){//在drop上触发的事件
      settings.callback.drop && settings.callback.drop.call(this,e);
    });
    this.dom.on("dragend",settings.selector.drag,function(e){//这是在drag上触发的事件
      settings.callback.dragend && settings.callback.dragend.call(this,e);
    });
	}
	$.fn.DragDrop.DEFAULTS={};
	$.fn.DragDrop.DEFAULTS.SETTINGS={

		selector:{
			drag:".drag",
      drop:".drop"
		},//拖拽区
		callback:{
			dragstart:function(){ console.log("dragstart") },	//开始拖对象时触发									目标：被拖动对象
			dragenter:function(){ console.log("dragenter") },	//当对象第一次被拖动到目标对象上时触发，同时表示该目标对象允许‘放’这动作 目标：目标对象
			dragover  :function(){ console.log("dragover") },	//当对象拖动到目标对象时触发 						目标：当前目标对象
			dragleave:function(){ console.log("dragleave") },	//在拖动过程中，当被拖动对象离开目标对象时触发		目标：当前目标对象
			drag:function(){ console.log("drag") },				//每次当对象被拖动时就会触发						目标：被拖动对象
			drop  :function(){ console.log("drop") },			//当发生“放”这动作时触发							目标：当前目标对象
			dragend:function(){ console.log("dragend") }		//在拖放过程，松开鼠标时触发  						目标：被拖动对象
		}

	}

})(jQuery, window, document);
