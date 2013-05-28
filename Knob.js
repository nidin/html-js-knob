/**
 * ...
 * @author Nidin Vinayak
 */

/** Knob - alpha (Pure UI components)**/
var Knob;
(function (Knob) {
    var Knob = (function () {
		var el;
		pt = {x:0,y:0};
		var html = '<div class="knob_bg"><div class="knob_pointer" onmousedown="Knob.handleEvent(event)"><div class="kp_line_1"></div><div class="kp_line_2"></div></div></div>';
        function Knob(id) {
			el = document.getElementById(id);
			el.innerHTML = html;
		};
        return Knob;
    })();
	this.Knob = Knob;
	Knob.FACTOR = 2;
	window.bigValue = function(dx,dy)
	{
		var a = Math.sqrt(dx * dx);
		var b = Math.sqrt(dy * dy);
		return a > b?dx:dy;
	}
	Knob.handleEvent = function(e){
		targetKnob = e.currentTarget;
		if(!targetKnob.deg){
			targetKnob.deg = 0;
		}
		if(e.type == "mousedown"){
			window.onmousemove = Knob.updateKnob;
			pt.x = e.clientX;
			pt.y = e.clientY;
		}else if(e.type == "mouseup"){
			window.onmousemove = null;
		}
	};
	Knob.updateKnob = function(e){
		var dx = e.clientX - pt.x;
		var dy = e.clientY - pt.y;
		pt.x = e.clientX;
		pt.y = e.clientY;
		var diff = bigValue(dx, -dy);
		targetKnob.deg += diff * Knob.FACTOR;
		Knob.update();
	};
	Knob.update = function(){
		targetKnob.deg = targetKnob.deg > 235?235:(targetKnob.deg < -55? -55:targetKnob.deg);
		targetKnob.style.MozTransform="rotate("+targetKnob.deg+"deg)";
		targetKnob.style.webkitTransform="rotate("+targetKnob.deg+"deg)";
		if (targetKnob.deg > 90) {
			targetKnob.firstChild.nextSibling.style.top = "7px";
		}else {
			targetKnob.firstChild.nextSibling.style.top = "9px";
		}
	}
	window.onmouseup = Knob.handleEvent;
})(Knob || (Knob = {}));