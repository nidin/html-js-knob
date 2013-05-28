/**
 * ...
 * @author Nidin Vinayak
 */

/** Knob - alpha (Pure UI components)**/
var Knob;
(function (Knob) {
    var Knob = (function () {
		var pt = {x:0,y:0};
		var html = '<div class="knob_bg"><div class="knob_pointer"><div class="kp_line_1"></div><div class="kp_line_2"></div></div></div>';
        function Knob(id) {
			this.el = document.getElementById(id);
			this.el.knob = this;
			this.el.innerHTML = html;
			this.rotor = this.el.firstChild.firstChild;
			this.deg = -55;
			this.el.onmousedown = this.handleEvent;
			window.onmouseup = this.handleEvent;
			window.mouseleave = this.handleEvent;
		};
		Knob.prototype.value = function(_v){
			if(_v){
				this._value = _v;
				this.deg = (_v * 290) - 55;
				this.update(this);
			}
			else{
				this._value = (this.deg + 55)/290;
			}
			return this._value;
		};
		Knob.prototype.onChange = function(callback){
			this.onchange = callback;
		};
		Knob.prototype.handleEvent = function(e){
			if(e.type == "mousedown"){
				document.onselectstart = null;
				window.onmousemove = Knob.prototype.updateKnob;
				Knob.target = e.currentTarget.knob;
				pt.x = e.clientX;
				pt.y = e.clientY;
			}else if(e.type == "mouseup" || e.type == "mouseleave"){
				Knob.target = null;
				window.onmousemove = null;
			}
		};
		Knob.prototype.updateKnob = function(e){
			var dx = e.clientX - pt.x;
			var dy = e.clientY - pt.y;
			pt.x = e.clientX;
			pt.y = e.clientY;
			var diff = bigValue(dx, -dy);
			Knob.target.deg += diff * Knob.FACTOR;
			Knob.prototype.update(Knob.target);
			if(Knob.target.onchange)Knob.target.onchange((Knob.target.deg + 55)/290);
		};
		Knob.prototype.update = function(target){
			var rotor = target.rotor;
			var deg = target.deg;
			deg = deg > 235?235:(deg < -55? -55:deg);
			target.deg = deg;
			rotor.style.MozTransform="rotate("+deg+"deg)";
			rotor.style.webkitTransform="rotate("+deg+"deg)";
			rotor.style.msTransform ="rotate("+deg+"deg)";
			rotor.style.msTransform ="rotate("+deg+"deg)";
			rotor.style.OTransform ="rotate("+deg+"deg)";
			if (deg > 90) {
				rotor.firstChild.nextSibling.style.top = "7px";
			}else {
				rotor.firstChild.nextSibling.style.top = "9px";
			}
		};
        return Knob;
    })();
	this.Knob = Knob;
	Knob.FACTOR = 2;
	Knob.target = null;
	window.bigValue = function(dx,dy)
	{
		var a = Math.sqrt(dx * dx);
		var b = Math.sqrt(dy * dy);
		return a > b?dx:dy;
	}
})(Knob || (Knob = {}));