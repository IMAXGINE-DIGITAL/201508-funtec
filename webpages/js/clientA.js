(function($){
	$.app = $.app || {};
	$.app.clientA = new $.Client({
		role: 0
	});
	$.app.clientA.running1 = function(){
		var _this = this;
		$("div#animate-block").html("running1");
		_this.status = $.Client.STATUS.RUNNING;
	};
	$.app.clientA.stop1 = function(){
		var _this = this;
		$("div#animate-block").html("");
	};
	$.app.clientA.running2 = function(){
		var _this = this;
		$("div#animate-block").html("running2");
		_this.status = $.Client.STATUS.CRASHED;
	};
	$.app.clientA.stop2 = function(){
		var _this = this;
		$("div#animate-block").html("");
	};

	$.app.clientA.start = function(){};

})(jQuery);