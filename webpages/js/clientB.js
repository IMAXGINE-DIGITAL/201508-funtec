(function($){
	$.app = $.app || {};
	$.app.transId = $.getUrlParam("trans_id");

	$.app.clientB = new $.Client({
		role: 1,
		trans_id: $.app.transId
	});

	


	$.app.clientB.start = function(){
		$.app.clientB.allocB(function(){
			setInterval(function(){
				$.app.clientB.state();
			}, 1000);
		});
	};

})(jQuery);