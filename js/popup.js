// $('input').each(function (global, factory) {
// 	var type = $(this).attr('type');
// 	if (/^date|year|month|time|hour|minute/.test(type)) {
// 	    new DateTime($(this));
// 	}
// });
// $("input").change(function() {
//     console.log('选择的时间是：' + this.value);
//     // chrome.tabs.sendMessage(1,this.value,  function(response) {
//     //     console.log('fuck');
// 	   //  });
// });

new Select($(".select"));