(function($){

	var URL_STATE = "../../HondaSafetyTechWs.asmx/HondaSafetyTechGetState";//"../data/state.xml";//
	var URL_INIT_CLIENTA = "../../HondaSafetyTechWs.asmx/HondaSafetyTechTransInit";//"../data/initA.xml";//
	var URL_INIT_CLIENTB = "../../HondaSafetyTechWs.asmx/HondaSafetyTechTransStart";//"../data/initB.xml"; //
	var URL_CRASH = "../../HondaSafetyTechWs.asmx/HondaSafetyTechCrash";//"../data/crash.xml";//
	var URL_FINISH = "../../HondaSafetyTechWs.asmx/HondaSafetyTechTransFinish";//"../data/finish.xml";//


	$.ajaxSetup({
		error: function(e){
			console.log(e);
			$("div#result").html(e.responseText);
		},
		//contentType: "application/xml; charset=utf-8",
		//contentType: "application/json; charset=utf-8",
		dataType: "json"//"xml"
	});

	$.Client = function(options){
		var defaults = {
			mode: 0, //0 car-car; 1 car-person
			id: null,
			role: 0, // 0代表生成二维码者，1代表扫描二维码者
			transId: null,
			platform: "pc",
			status: null
		};

		var settings = $.extend({}, defaults, options);

		this.init(settings);
	};
	$.Client.STATUS = {
		INIT: "init",
		READY: 1,
		RUNNING: 2,
		CRASHED: 3,
		FINISHED: 4,
		INVALID: 0
	};
	$.Client.prototype.init = function(settings){
		var _this = this;
		_this.mode = settings.mode;
		_this.role = settings.role;
		_this.transId = settings.transId ? settings.transId : null;

		_this.status = $.Client.STATUS.INIT;
	};
	$.Client.prototype.allocA = function(callback){
		var _this = this;
		//向服务器注册client
		$.post(URL_INIT_CLIENTA,{
			"mode": _this.mode
		}, function(result){
			// var result = $.xml2json(result, false);
			if (result.status === "success"){
				_this.transId = result.trans_id;
				_this.id = "role0";//$.cookie("role_id");
				_this.status = $.Client.STATUS.READY;

				if ($.isFunction(callback)){
					callback.call(_this, result.trans_id);
				};
			};
			console.log(result);
		});
	};
	$.Client.prototype.allocB = function(callback){
		var _this = this;
		$.post(URL_INIT_CLIENTB, {
			"trans_id": _this.transId,
			"role": _this.role
		}, function(result){
			// var result = $.xml2json(result, false);
			if (result.status === "success"){
				_this.id = "role1"//$.cookie("role_id");
				_this.status = $.Client.STATUS.READY;

				if ($.isFunction(callback)){
					callback.call(_this, result);
				};
			};
			console.log(result);
		});
	};
	$.Client.prototype.state = function(callback){
		var _this = this;
		$.post(URL_STATE,{
			"role_id": _this.id,
			"role": _this.role,
			"trans_id": _this.transId
		}, function(result){
			// var result = $.xml2json(result, false);
			if (result.status === "success"){
				if ($.isFunction(callback)){
					callback.call(_this, result.state);
				};
			};
			console.log(result);
		});
	};
	$.Client.prototype.rollState = function(handler){
		var _this = this;
		clearInterval(_this.stateTime);
		_this.stateTime = setInterval(function(){
			_this.state(handler);
		}, 1*1000);
	};
	$.Client.prototype.stopRollState = function(handler){
		var _this = this;
		clearInterval(_this.stateTime);
	};
	$.Client.prototype.crash = function(){
		var _this = this;
		$.post(URL_CRASH,{
			"role_id": _this.id,
			"role": _this.role,
			"trans_id": _this.transId
		}, function(result){
			// var result = $.xml2json(result, false);
			if (result.status === "success"){
				//
			};
			console.log(result);
		});
	};
	$.Client.prototype.finish = function(callback){
		var _this = this;
		$.post(URL_FINISH,{
			"trans_id": _this.transId,
			"role": _this.role,
			"role_id": _this.id
		}, function(result){
			// var result = $.xml2json(result, false);
			if (result.status === "success"){


				_this.stopRollState();
				_this.status = $.Client.STATUS.READY;
				$.cookie("role_id", null, {path:"/"});

				if ($.isFunction(callback)){
					callback.call(_this);
				}
			};
			console.log(result);
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

	