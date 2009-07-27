/*
##############################################################################
	GLOBAL FUNCTONS
##############################################################################
*/


/*
根据ID得到页面元素
*/
function $(id){
	return document.getElementById(id);	
}


function $getURL(url){
	if(url.indexOf('javascript:')===0){
		try{
			eval(url.replace('javascript:', ''));
		}catch(e){}
		
	}else if(url.indexOf('browser:')==0){
		//LAUNCH IE
		EXTERNAL.launchBrowser(url.replace('browser:', ''));
		
	}else if(typeof url == 'string' && url.length > 0){
		//$alert('LEAVING THIS PAGE!');
		//window.location.href = url;
	}
}

/*
写入Cookie
*/
function $writeCookie(name, value, hours){
	var expire = '';
	if(hours != null){
		expire = new Date((new Date()).getTime() + hours * 3600000);
		expire = "; Expires=" + expire.toGMTString();
	}
	document.cookie = name + "=" + escape(value) + expire;
}

/*
获取Cookie
*/
function $getCookie(name){
	var cookieValue = "";
	var search = name + "=";
	if(document.cookie.length > 0){ 
		offset = document.cookie.indexOf(search);
		if (offset != -1){ 
			offset += search.length;
			end = document.cookie.indexOf(";", offset);
			if (end == -1) end = document.cookie.length;
			cookieValue = unescape(document.cookie.substring(offset, end))
		}
	}
	return cookieValue;
}

/*
转换成json对象
*/
function $parseJson(str){
	try{
		eval('var obj='+str);
		return obj;
	}catch(e){
		return null;
	}
}

/*
 * 转换成json字符串
 */
function $toJsonString(obj){
	var isArray = obj instanceof Array;
	var r = [];
	for(var i in obj){
		var value = obj[i];
		if(typeof value == 'string'){
			value = '"' + value + '"';
		}else if(value != null && typeof value == 'object'){
			value = $toJsonString(value);
		}
		r.push((isArray?'':i+':')+value);
	}
	if(isArray){
		return '['+r.join(',')+']';
	}else{
		return '{'+r.join(',')+'}';
	}
}

function $copy(obj){
	var o = {};
	for(var i in obj) o[i] = obj[i];
	return o;
}

function $getWorkSpace(){
	var l = window.location.href;
	return l.substring(0, l.lastIndexOf('/')+1);
}

function $getFileName(path){
	return path.substring(path.lastIndexOf('/')+1, path.length);
}

/*
 * 清除子元素
 */
function $clearElement(container){
	var nodes = container.childNodes;
	for(var i=0; i<nodes.length; i++){
		container.removeChild(nodes[i]);
	}
}

function $getRequestObject(){
	var s = window.location.search.replace('?', '');
	var params = s.split('&');
	var request = {};
	for(var i=0; i<params.length; i++){
		var v = params[i].split('=');
		request[v[0]] = v[1];
	}
	return request;
}

function $getRemoteData(url, callback, sync){
	var xmlRequest = new XMLHttpRequest();
		xmlRequest.callback = callback;
		xmlRequest.onreadystatechange = function(){
			if(this.readyState == 4) this.callback(this.responseText);
		}
		xmlRequest.open("GET", url, sync);
		xmlRequest.send(null);
		//if(sync) callback(xmlRequest);
}

function $setInnerText(container, txt){
	$clearElement(container);
	if(txt==''||txt==undefined) return;
	container.appendChild(document.createTextNode(txt));
}

function $download(url, saveto, sync, callback){
	window.external.getFileTransfer().download(url, saveto, sync, callback);
}


function $hover(target, bDown){
	if(bDown){
		if(target.src.indexOf('_.png')>-1)return;
		target.src = target.src.replace('.png', '_.png');
	}else{
		target.src = target.src.replace('_.png', '.png');
	}
}

function $c(id){
  return document.createElement(id);

}

function $ct(text){
  return document.createTextNode(text);

}

function $f(fee){
	fee = fee*100/100;
	if(fee=="0"){
		return "0.00";
	}else{
	  fee = fee/100.00;
	}
	return fee;
}

