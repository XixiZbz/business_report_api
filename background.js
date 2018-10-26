// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     console.log(sender.tab ?
//                 "来自内容脚本：" + sender.tab.url :
//                 "来自扩展程序");
//     if (request.greeting == "您好")
//       sendResponse({farewell: "再见"});
//   });

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.datetime !== undefined){
    	    console.log(message.datetime)
		    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			  chrome.tabs.sendMessage(tabs[0].id, message.datetime, function(response) {
			  });
			});
			// chrome.tabs.query(function(tabs) {
			//   chrome.tabs.sendMessage(tabs[0].id, message.datetime, function(response) {
			//   });
			// });
	}
	else{
		console.log('hello')
		// function push_to_db(message){
	 //    $.ajax({
	 //            type: "post",
	 //            url : "https://py.umaicloud.com/api/v1.0",
	 //            data:message,
	 //            async: true,
	 //            timeout: 5000,
	 //            success: function(response){
	 //                console.log(response)
	 //            }
	 //        })

		// }
	}
  	
});
