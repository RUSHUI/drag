
$(function(){										//html element

	$(".container").Resize();
	$(".container").Drag({
		selector:{
			drag:".drag-block"
		},//拖拽区
		callback:{
			mouseDown:function(){ console.log("mousedown") },
			mouseMove:function(){ console.log("mousemove") },
			mouseUp  :function(){ console.log("mouseup") }
		},
		scale:1
	});
    $(window).resize();
});