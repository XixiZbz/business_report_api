$('input').each(function (global, factory) {
	var type = $(this).attr('type');
	if (/^date|year|month|time|hour|minute/.test(type)) {
	    new DateTime($(this));
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
var count = 0
$("#test").click(function(){
		console.log("数字加1",count);
		innerHTML = String(count)+"%"
		document.getElementById("posting-num").innerHTML=innerHTML
	}



	)

// $("button").click(function(){
// // 	chrome.runtime.sendMessage({
// // 	  datetime: data_time
// // 	  console.log('get button')
// // }, function(response))
// 	chrome.runtime.sendMessage(
// 		{datatime: date_time},
// 		function(response){
// 			console.log('get button');
// 		})
// });

// chrome.runtime.sendMessage({
// 	  method: 'showAlert',
// 	  datetime: this.value
// }, function(response) {});
chrome.runtime.getBackgroundPage(function(message,sender,sendRseponse){
	console.log(message.data)
})