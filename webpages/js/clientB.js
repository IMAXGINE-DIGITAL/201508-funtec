(function($){
	$.app = $.app || {};
	//console.log( $.getUrlParam("trans_id"));
	$.app.clientB = new $.Client({
		role: 1,
		transId: $.getUrlParam("trans_id")
	});
	$.app.clientB.running1 = function(){
		var _this = this;
		$("div#animate-block").html("running1");
		_this.status = $.Client.STATUS.RUNNING;
	};
	$.app.clientB.stop1 = function(){
		var _this = this;
		$("div#animate-block").html("");
	};
	$.app.clientB.running2 = function(){
		var _this = this;
		$("div#animate-block").html("running2");
		_this.status = $.Client.STATUS.CRASHED;
	};
	$.app.clientB.stop2 = function(){
		var _this = this;
		$("div#animate-block").html("");
	};

	$.app.clientB.finishHanlder = function(){
		var _this = this;
		_this.stop1();
		_this.stop2();
	};


	$.app.clientB.start = function(){};

})(jQuery);