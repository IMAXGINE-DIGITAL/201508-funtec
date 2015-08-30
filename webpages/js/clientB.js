(function($){
	$.app = $.app || {};
	$.app.transId = $.getUrlParam("trans_id");

	$.app.clientB = new $.Client({
		role: 1,
		trans_id: $.app.transId
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


	$.app.clientB.start = function(){};

})(jQuery);