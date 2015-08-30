(function($){

	var URL_INIT_CLIENT = "";
	var URL_STATE = "";

	$.ajaxSetup({
		error: function(e){
			console.log(e);
		},
		dataType: "xml"
	});

	$.Client = function(options){
		var defaults = {
			mode: 0, //0 car-car; 1 car-person
			id: null,
			role: 0, // 0代表生成二维码者，1代表扫描二维码者
			trans_id: null
		};

		var settings = $.extend({}, defaults, options);

		this.init(settings);
	};
	$.Client.prototype.init = function(settings){
		$.post(URL_INIT_CLIENT, function(result){

		});
	};
	$.Client.prototype.state = function(){
		var _this = this;
		$.post(URL_STATE, function(result){

		});
	};




	$.ClientA = function(){};
	$.ClientA.prototype = new $.Client({
		role: 0
	});

	$.ClientB = function(){};
	$.ClientB.prototype = new $.Client();
})(jQuery);

	