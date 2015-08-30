(function($){

	var URL_STATE = "../../HondaSafetyTechWs.asmx?op=HondaSafetyTechGetState";
	var URL_INIT_CLIENTA = "../../HondaSafetyTechWs.asmx/HondaSafetyTechTransInit";
	var URL_INIT_CLIENTB = "../../HondaSafetyTechWs.asmx?op=HondaSafetyTechTransStart";
	var URL_ACCIDENT = "../../HondaSafetyTechWs.asmx?op=HondaSafetyTechCrash";
	var URL_FINISH = "../../HondaSafetyTechWs.asmx?op=HondaSafetyTechTransFinish";


	$.ajaxSetup({
		error: function(e){
			console.log(e);
			$("div#result").html(e.responseText);
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
		$.post(URL_INIT_CLIENTA,{
			"mode": _this.mode
		}, function(result){
			var result = $.xml2json(result, false);
			_this.id = result.id;
			_this.roleId = result.roleId;
			_this.transId = result.transId;
		});
	};
	$.Client.prototype.allocB = function(callback){
		var _this = this;
		$.post(URL_INIT_CLIENTB, {
			"trans_id": _this.transId,
			"role": _this.role
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
		$.post(URL_ACCIDENT,{
			"role_id": _this.id,
			"role": _this.role,
			"trans_id": _this.transId
		}, function(result){
			var result = $.xml2json(result, false);

		});
	};
	$.Client.prototype.finish = function(){
		var _this = this;
		$.post(URL_FINISH,{
			"trans_id": _this.transId,
			"role": _this.role,
			"role_id": _this.roleId
		}, function(result){
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

	