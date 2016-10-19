
$(function(){										//html element

	$(".container").DragDrop({
		selector:{
			drag:".drag",
      drop:".drop"
		},//拖拽区
		callback:{
			dragstart:function(e){
				console.log("dragstart")
			},	//开始拖对象时触发									目标：被拖动对象
			dragenter:function(e){
				console.log("dragenter")
			},	//当对象第一次被拖动到目标对象上时触发，同时表示该目标对象允许‘放’这动作 目标：目标对象
			dragover  :function(e){
				console.log("dragover")
			},	//当对象拖动到目标对象时触发 						目标：当前目标对象
			dragleave:function(e){
				console.log("dragleave")
			},	//在拖动过程中，当被拖动对象离开目标对象时触发		目标：当前目标对象
			drag:function(e){
				console.log("drag")
			},				//每次当对象被拖动时就会触发						目标：被拖动对象
			drop  :function(e){
				console.log("drop")
			},			//当发生“放”这动作时触发							目标：当前目标对象
			dragend:function(e){
				console.log("dragend")
			}		//在拖放过程，松开鼠标时触发  						目标：被拖动对象
		}
	});
});
