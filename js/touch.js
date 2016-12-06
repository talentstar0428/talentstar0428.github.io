var Touch = function () {
	
	var main			=	this;
	var isAction		=	false;
	var isTouchSupport	=	null;
	var startEvent		=	null;
	var moveEvent		=	null;
	var endEvent		=	null;
	var xDown			=	null;
	var yDown			=	null;
	var horizontalFunc	=	null;
	var verticalFunc	=	null;

	main.init 			=	function(widget, horizontalFunc, verticalFunc) {
		main.isTouchSupport		=	'ontouchstart' in window;
		main.startEvent			=	main.isTouchSupport?'touchstart':'mousedown';
		main.moveEvent			=	main.isTouchSupport?'touchmove':'mousemove';
		main.endEvent			=	main.isTouchSupport?'touchend':'mouseup';
		main.horizontalFunc		=	horizontalFunc;
		main.verticalFunc 		=	verticalFunc;

		widget.addEventListener(main.startEvent, main.startTouch);
		widget.addEventListener(main.moveEvent, main.moveTouch);
		widget.addEventListener(main.endEvent, main.endTouch);
	}

	main.startTouch		=	function(event) {
		console.log(main.isTouchSupport);
		if (main.isTouchSupport != false && event.touches.length >= 1) {
			main.isAction == false;
			return;
		}
		main.isAction 	=	true;

		main.xDown		=	main.isTouchSupport?event.touches[0].clientX:event.clientX;
		main.yDown		=	main.isTouchSupport?event.touches[0].clientY:event.clientY;
	}

	main.moveTouch		=	function(event) {
		if (main.isTouchSupport != false && event.touches.length >= 1) {
			main.isAction == false;
			return;
		}
		if (main.isAction) {
			var xUp 	= 	main.isTouchSupport?event.touches[0].clientX:event.clientX;
			var yUp		=	main.isTouchSupport?event.touches[0].clientY:event.clientY;

			var xDiff	=	xUp - main.xDown;
			var yDiff	=	yUp - main.yDown;
			if (Math.abs(xDiff) > Math.abs(yDiff)) {
				main.horizontalFunc(xDiff);
			}
			else {
				main.verticalFunc(yDiff);
			}
			main.xDown	=	xUp;
			main.yDown	=	yUp;
		}
	}

	main.endTouch		=	function(event) {
		main.isAction 	=	false;
		main.xDown		=	null;
		main.yDown 		=	null;
	}

}