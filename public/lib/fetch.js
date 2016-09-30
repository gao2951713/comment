/**
* 将promise类型的fetch方法封装，便于全局使用。
* json方法，返回jsion格式的字符串。
* post方法，传递post请求。传递form参数。
*/
// 定义fetch请求对象的所有属性。
var $ = {
	headers:null,
	myinit:null,
	send:null,
	postJson:null,
	getJson:null,
};
// 对各个属性进行赋值(重定义)操作。
	$.headers = new Headers({
                       'Accept' : 'application/json',
                       'Content-Type' : 'application/json'
					   
	});
	$.myinit = {
		method : 'POST',
		headers : $.headers,
		body:"",
		mode: 'cors',
		cache : 'default'
	};
	// 基础方法。返回promise对象。
	$.send = (url,init) => {
		return new Promise(function(resolve,reject) {
			fetch(url,init)
				.then( res => {
					if (res.ok) {
						resolve(res);
					} else {
						reject('服务器繁忙，请稍后再试；\r\nCode:' + response.status);
					}
				})
			.catch(err => {
				reject(err);
			})
		});

	};
	$.postJson = (url,params) => {
		$.myinit.method = "POST";
		$.myinit.headers = $.headers;
		$.myinit.body = JSON.stringify(params);
		console.log($.myinit);
		return ($.send(url,$.myinit).then(res=> res.json()));
	};
	$.getJson = (url,params) => {
		$.myinit.headers = $.headers;
		$.myinit.method = "GET";
		// $.myinit.body = JSON.stringify(params);
		// HEAD,GET 方法中不能有body属性。
		delete $.myinit.body;
		return ($.send(url,$.myinit).then(res=> res.json()));
	};

