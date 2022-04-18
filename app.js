
const average = (array) => array.reduce((a, b) => a + b) / array.length;
//getStockData();


async function getStockData(){


date1 = document.getElementById("day1").value;
date2 = document.getElementById("day2").value;
stock = document.getElementById("stock").value;
console.log("Day1: "+ date1 )
console.log("Day1: "+ date2 )

console.log("https://eodhistoricaldata.com/api/eod/"+stock+
	".US?api_token=625cdb1c39d9f5.23708719&period=d&fmt=json&from="+date1+"&to="+date2)

const response = await fetch("https://eodhistoricaldata.com/api/eod/"+stock+
	".US?api_token=625cdb1c39d9f5.23708719&period=d&fmt=json&from="+date1+"&to="+date2);

let data = await response.json();



let close_price = [];
let adjusted_close = [];
let date = [];

// let data = [{"date":"2022-01-05","close":100,"adjusted_close":110},
// 			{"date":"2022-01-06","close":200,"adjusted_close":2100},
// 			{"date":"2022-01-06","close":200,"adjusted_close":2100}];
	console.log(data)

	data.forEach(stock => {
  	close_price.push(stock.close);
  	adjusted_close.push(stock.adjusted_close);
  	date.push(stock.date);
	
	})

	let table_html = "<br><br> <table class='table table-dark'><thead><tr>\
							<th>Date</th><th>Close($)</th><th>Adjusted Close ($)</th></tr></thead><tbody>"
	let table_fill =""
	let table_close = "</body></table>"
	for (let index = 0; index < close_price.length; ++index){
    	table_fill = table_fill + "<tr><td>"+date[index]+"</td><td>"+close_price[index]+"</td><td>"+adjusted_close[index]+"</td>";
    }
    document.getElementById("main-content").innerHTML = table_html+table_fill+table_close;
    document.getElementById("averages").innerHTML = stock +"<br>"+ date1 +" to "+ date2+
    												"<br>Average closing price: $"+average(close_price).toFixed(2)+"<br>"+
    												"Average <b>adjusted</b> closing price: $"+average(adjusted_close).toFixed(2);
	
}

let showLoading = function(selector){
	let html = "<div class='text-center'>";
	html += "<img src='load.gif></div>";
	insertHtml(selector, html);
}