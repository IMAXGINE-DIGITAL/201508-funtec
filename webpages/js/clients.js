(function($){

	var URL_STATE = "../data/state.xml";
	var URL_INIT_CLIENTA = "http://10.0.1.7:8080/HondaSafetyTechWs.asmx/HondaSafetyTechTransInit";
	var URL_INIT_CLIENTB = "../data/init.xml";
	var URL_ACCIDENT = "";
	var URL_FINISH = "";
	

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
			transId: null,
			roleId: null,
			platform: "pc"
		};

		var settings = $.extend({}, defaults, options);

		this.init(settings);
	};
	$.Client.prototype.init = function(settings){
		var _this = this;
		_this.role = settings.role;
		_this.transId = settings.transId ? settings.transId : null;
	};
	$.Client.prototype.allocA = function(callback){
		var _this = this;
		//向服务器注册client
		$.post(URL_INIT_CLIENTA, function(result){
			var result = $.xml2json(result, false);
			_this.id = result.id;
			_this.roleId = result.roleId;
			_this.transId = result.transId;
		});
	};
	$.Client.prototype.allocB = function(callback){
		var _this = this;
		$.post(URL_INIT_CLIENTB, {
			"trans_id": _this.transId
		}, function(result){
			if ($.isFunction(callback)){
				callback.call(_this, result);
			};
		});
	};
	$.Client.prototype.state = function(){
		var _this = this;
		$.post(URL_STATE,{
			"role_id": _this.id,
			"role": _this.role,
			"trans_id": _this.transId
		}, function(result){
			var result = $.xml2json(result, false);
		});
	};
	$.Client.prototype.accident = function(){
		var _this = this;
		$.post(URL_ACCIDENT, function(result){
			var result = $.xml2json(result, false);

		});
	};
	$.Client.prototype.finish = function(){
		var _this = this;
		$.post(URL_FINISH, function(result){
			var result = $.xml2json(result, false);

		});
	}




	// $.ClientA = function(){};
	// $.ClientA.prototype = new $.Client({
	// 	role: 0
	// });

	// $.ClientB = function(){};
	// $.ClientB.prototype = new $.Client({
	// 	role: 1
	// });
})(jQuery);

	