chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.datetime !== undefined){
    	    console.log(message.datetime)
		    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			  chrome.tabs.sendMessage(tabs[0].id, message.datetime, function(response) {
			  });
			});
	
	}
	else if(message.percent!=undefined){
			console.log("percent",message.percent.toFixed(2)*100)
			var percent = message.percent
	}
  	
});

