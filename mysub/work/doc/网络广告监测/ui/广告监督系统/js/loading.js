
var xmlHttp2;
function createXmlHttp2() {
if (window.XMLHttpRequest) {
xmlHttp2 = new XMLHttpRequest();
} else {
xmlHttp2 = new ActiveXObject("Microsoft.XMLHTTP");
}
} 
　　//获取页面信息的蜩用函数
function switchPage(pageName) {
createXmlHttp2();
writePageInfo(''
+'<div class="win_open"  style="width:400px; position:absolute; z-index:9; left:150px; top:100px;background:#fff;">'
+	'<h3><strong>温馨提示</strong></h3>'
+	'<div class="content">'
+		'<div class="loads"><img src="images/wait.gif" /><p>数据加载中...<br/>请您耐心等待。</p></div>'
+	'</div>'
+'</div>'
);
xmlHttp2.onreadystatechange = writePageInfo;
xmlHttp2.open("GET", pageName, true);
xmlHttp2.send(null);
//xmlHttp2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//xmlHttp2.setRequestHeader("If-Modified-Since", "0");
} 
　　//获掫页面信息的回调函数
function writePageInfo(pageInfo) {
//如果没有传叺pageInfo参数，则读取xmlHttp对象哋姠应结果
if (pageInfo == undefined) {
if (xmlHttp2.readyState == 4) {
var pageInfo = xmlHttp2.responseText;
document.getElementById("showdiv").innerHTML = pageInfo;
}
} else {
document.getElementById("showdiv").innerHTML = pageInfo;
}
}

