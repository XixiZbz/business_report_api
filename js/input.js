$('input').each(function (global, factory) {
	var type = $(this).attr('type');
	if (/^date|year|month|time|hour|minute/.test(type)) {
	    new DateTime($(this),{
	    	onShow:function(){
	    		console.log('log')
	    		// $("body").css({"width":"580","height":"450"})
	    	},
	    	onHide:function(){
	    		console.log('das')
	    		// $("body").css({"width":"500","height":"400"})
	    	}
	    })
	  
	}
});
$("input").change(function() {
    console.log('选择的时间是：' + this.value);
    date_time = this.value
    $("button").click(function(){
	chrome.runtime.sendMessage(
		{datetime: date_time},
		function(response){
			console.log('get button');
		})
});
});
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	if(message.percent!=undefined){
			console.log("percent",message.percent.toFixed(2)*100)
			var percent = message.percent.toFixed(2)*100
			$('progress').attr({'value':percent})
			$('#tabTarget2 .progress-main .progress-top .right').text(percent+"%")
	}
  	
});





