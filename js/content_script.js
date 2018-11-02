
var SortColumn = 'sortColumn=17&'
var cols = "cols=%2Fc0%2Fc1%2Fc2%2Fc3%2Fc4%2Fc5%2Fc6%2Fc7%2Fc8%2Fc9%2Fc10%2Fc11%2Fc12%2Fc13%2Fc14%2Fc15%2Fc16&"
var reportID = "reportID=102%3ADetailSalesTrafficBySKU&"
var sortIsAscending = 'sortIsAscending=0&'
var currentPage = 'currentPage=0&'
var dateUnite = 'dateUnit=1&'
var viewDateUnits = 'viewDateUnits=ALL&'
var runDate = "runDate&"
var nowTime = "_="+new Date().getTime()
var pre_url = window.location.href.split("gp")[0]
var filterFromDate = "filterFromDate=09/01/2018&"
var fromDate = 'fromDate=09/01/2018&'
var filterToDate = 'filterToDate=10/11/2018&'
var toDate = 'toDate=10/11/2018&'
var request_url = pre_url+
"/gp/site-metrics/load-report-JSON.html/ref=au_xx_cont_sitereport?"+
SortColumn+
filterFromDate+
filterToDate+
fromDate+
toDate+
cols+
reportID+
sortIsAscending+
currentPage+
dateUnite+
viewDateUnits+
runDate+
nowTime


language = $("option[selected='selected']")[0].text

var re = /(\w+):\/\/([^\:|\/]+)(\:\d*)?(.*\/)([^#|\?|\n]+)?(#.*)?(\?.*)?/i

function date_form(date){
	form_date_list = date.split('-')
	year = form_date_list[0]
	monthString = form_date_list[1]
	dayString = form_date_list[2]
	month = parseInt(monthString)
	day = parseInt(dayString)
	console.log(language)
	if(month<10){
		month = "0"+month.toString()
	}
	else {
		month = month.toString()
	}

	if(day<10){
		day = "0"+day.toString()
	}
	else{
		day = day.toString()
	}
	if(language=="English"){
		console.log('it is english')
		if(pre_url=='https://sellercentral.amazon.com/' || pre_url=='https://sellercentral-japan.amazon.com/' || pre_url=='https://sellercentral.amazon.ca/')
		{
			form_date = month+"%2F"+day+"%2F"+year
		}
		else if (pre_url=='https://sellercentral.amazon.de/' || pre_url=='https://sellercentral.amazon.co.uk/' || pre_url=='https://sellercentral.amazon.fr/' || pre_url=='https://sellercentral.amazon.it/' || pre_url=='https://sellercentral.amazon.com.au/'){
			form_date = day+"%2F"+month+"%2F"+year
		}
	}
	else if(language=='中文'){
		console.log('it is chinese')
		form_date = year+"-"+month+"-"+day
		console.log(form_date)
	}
	return form_date
}

function dateDiff(startDateString, endDateString){  
    var separator = "-"; //日期分隔符  
    var startDates = startDateString.split(separator);  
    var endDates = endDateString.split(separator);  
    var startDate = new Date(startDates[0], startDates[1]-1, startDates[2]);  
    var endDate = new Date(endDates[0], endDates[1]-1, endDates[2]);  
    return parseInt(Math.abs(endDate - startDate ) / 1000 / 60 / 60 /24);//把相差的毫秒数转换为天数   
};  
function dateForm(message){
	var Arrays = new Array();
	dateTimeList = message.split("至")
	beginDate = dateTimeList[0].replace(" ","")
	endDate = dateTimeList[1].replace(" ","")
	beginFormDate = date_form(beginDate)
	endFormDate = date_form(endDate)
	Arrays[0] = beginFormDate
	Arrays[1] = endFormDate
	Arrays[2] = beginDate
	Arrays[3] = endDate
	return Arrays
}


function getToday(){
	var currDate = new Date();
    var d = new Date();
    var YMD = d.getFullYear() + "-" +(d.getMonth()+1) + "-" + d.getDate();
    return YMD
}

function dateDiffIncludeToday(startDateString, endDateString){  
    var separator = "-"; //日期分隔符  
    var startDates = startDateString.split(separator);  
    var endDates = endDateString.split(separator);  
    var startDate = new Date(startDates[0], startDates[1]-1, startDates[2]);  
    var endDate = new Date(endDates[0], endDates[1]-1, endDates[2]); 
    if (endDate - startDate>0){
    	return parseInt(Math.abs(endDate - startDate ) / 1000 / 60 / 60 /24) + 1;
    	}//把相差的毫秒数转换为天数
    else{
    	return 0
    }

};  
function dateAddOne(nowDate){
	var d = new Date(nowDate)
	d.setTime(d.getTime()+24*60*60*1000);
	var s = d.getFullYear()+"-" + (d.getMonth()+1) + "-" + d.getDate();
	return s
}
function strToJson(str){
	return JSON.parse(str)
}

function pushToDb(message){
    $.ajax({
            type: "post",
            url : "https://py.umaicloud.com/api/v1.0",
            data:message,
            async: false,
            timeout: 5000,
            success: function(response){
                console.log(response)
            }
        })

	}

function fuckData(info,seller_id,r_date){
	var data = new Object()
	data['site_url'] = info[0].match(re)[2]
	if(info.length==17){
		parent_asin = info[0].match(">(.*)</a>")[1]
		data['parent_asin'] = parent_asin
		asin = info[1].match(">(.*)</a>")[1]
		data['asin'] = asin
		product_name = info[2]
		data["product_name"]=product_name
		seller_sku = info[3].match(">(.*)</a>")[1]
		data["seller_sku"]=seller_sku
		session = info[4]
		data["session"]=session
		session_percentage = info[5].match("<nobr>(.*)%</nobr")[1]
		data["session_percentage"]=session_percentage
		page_views = info[6]
		data["page_views"]=page_views
		page_views_percentage = info[7].match("<nobr>(.*)%</nobr>")[1]
		data["page_views_percentage"]=page_views_percentage
		buy_box_percentage = info[8].match("<nobr>(.*)%</nobr>")[1]
		data["buy_box_percentage"]=buy_box_percentage
		units_ordered = info[9]
		data["units_ordered"]=units_ordered
		units_ordered_b2b = info[10]
		data["units_ordered_b2b"]=units_ordered_b2b
		unit_session_percentage = info[11].match("<nobr>(.*)%</nobr>")[1]
		data["unit_session_percentage"]=unit_session_percentage
		unit_session_percentage_b2b = info[12].match("<nobr>(.*)%</nobr>")[1]
		data["unit_session_percentage_b2b"]=unit_session_percentage_b2b
		ordered_product_sales = info[13].match(/\w*.?([\d|,|\.]*)/)[1]
		data["ordered_product_sales"]=ordered_product_sales
		ordered_product_sales_b2b = info[14].match(/\w*.?([\d|,|\.]*)/)[1]
		data["ordered_product_sales_b2b"]=ordered_product_sales_b2b
		total_order_items = info[15]
		data["total_order_items"]=total_order_items
		total_order_items_b2b = info[16]
		data["total_order_items_b2b"]=total_order_items_b2b
		data['seller_id'] = seller_id
		data['r_date'] = r_date
	}
	else{
		parent_asin = info[0].match(">(.*)</a>")[1]
		data['parent_asin'] = parent_asin
		asin = info[1].match(">(.*)</a>")[1]
		data['asin'] = asin
		product_name = info[2]
		data["product_name"]=product_name
		seller_sku = info[3].match(">(.*)</a>")[1]
		data["seller_sku"]=seller_sku
		session = info[4]
		data["session"]=session
		session_percentage = info[5].match("<nobr>(.*)%</nobr")[1]
		data["session_percentage"]=session_percentage
		page_views = info[6]
		data["page_views"]=page_views
		page_views_percentage = info[7].match("<nobr>(.*)%</nobr>")[1]
		data["page_views_percentage"]=page_views_percentage
		buy_box_percentage = info[8].match("<nobr>(.*)%</nobr>")[1]
		data["buy_box_percentage"]=buy_box_percentage
		units_ordered = info[9]
		data["units_ordered"]=units_ordered
		units_ordered_b2b = "0"
		data["units_ordered_b2b"]=units_ordered_b2b
		unit_session_percentage = info[10].match("<nobr>(.*)%</nobr>")[1]
		data["unit_session_percentage"]=unit_session_percentage
		unit_session_percentage_b2b = "0"
		data["unit_session_percentage_b2b"]=unit_session_percentage_b2b
		ordered_product_sales = info[11].match(/\w*.?([\d|,|\.]*)/)[1]
		data["ordered_product_sales"]=ordered_product_sales
		ordered_product_sales_b2b = "0"
		data["ordered_product_sales_b2b"]=ordered_product_sales_b2b
		total_order_items = info[12]
		data["total_order_items"]=total_order_items
		total_order_items_b2b = "0"
		data["total_order_items_b2b"]=total_order_items_b2b
		data['seller_id'] = seller_id
		data['r_date'] = r_date
	}
	return data
}
function jsonToStr(json){
	str = JSON.stringify(json)
	return str
}
function postData(endFormDate,beginDate){
	seller_re = $('#spaui-state').html();
	sellerId = seller_re.match('"merchantId": "(.*)",')[1]
	var filterFromDate = "filterFromDate="+endFormDate+"&"
	var fromDate = "fromDate="+endFormDate+"&"
	var filterToDate = 'filterToDate='+endFormDate+'&'
	var toDate = 'toDate='+endFormDate+'&'
	var request_url = pre_url+
	"gp/site-metrics/load-report-JSON.html/ref=au_xx_cont_sitereport?"+
	SortColumn+
	filterFromDate+
	filterToDate+
	fromDate+
	toDate+
	cols+
	reportID+
	sortIsAscending+
	currentPage+
	dateUnite+
	viewDateUnits+
	runDate+
	nowTime
	


	console.log("really?"+request_url)
	$.ajax({
	    type: "get",
	    url: request_url,
	    timeout: 5000,
	    async: false,
	    success: function(data) {
	    	dataJson = strToJson(data)
	    	rows = dataJson.data.rows;
	    	for (x in rows){
	    		info = fuckData(rows[x],sellerId,beginDate)
	    		console.log(x,"fuck",info)
	    		pushToDb(info)

	    	}
	    }
	})
}
chrome.runtime.onMessage.addListener(function(message,sender,sendRseponse){

	dateArrays = dateForm(message)
	beginFormDate = dateArrays[0]
	endFormDate = dateArrays[1]
	beginDate = dateArrays[2]
	endDate = dateArrays[3]
	console.log(beginFormDate,endFormDate)
	todayDate = getToday()
	dateDiff = dateDiffIncludeToday(endDate, todayDate)
	allDay = dateDiffIncludeToday(beginDate, endDate)
	if (dateDiff>=0){
		while(dateDiff>0){
			console.log(dateDiff,beginDate,endDate)
			dateDiff = dateDiffIncludeToday(beginDate, endDate)
			console.log("allday",allDay,"dateDiff",dateDiff)
			percent = (allDay-dateDiff)/allDay
			chrome.runtime.sendMessage({percent:percent}, function(response) {
  					console.log('retrun hello');
			});
			postData(beginFormDate,beginDate)
			beginDate = dateAddOne(beginDate)
			beginFormDate = date_form(beginDate)
			console.log(beginDate,beginFormDate)
			}

		}
	else{
		console.log("pass")
	}
})
	

