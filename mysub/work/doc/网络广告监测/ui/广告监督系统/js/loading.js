
var xmlHttp2;
function createXmlHttp2() {
if (window.XMLHttpRequest) {
xmlHttp2 = new XMLHttpRequest();
} else {
xmlHttp2 = new ActiveXObject("Microsoft.XMLHTTP");
}
} 
����//��ȡҳ����Ϣ�����ú���
function switchPage(pageName) {
createXmlHttp2();
writePageInfo(''
+'<div class="win_open"  style="width:400px; position:absolute; z-index:9; left:150px; top:100px;background:#fff;">'
+	'<h3><strong>��ܰ��ʾ</strong></h3>'
+	'<div class="content">'
+		'<div class="loads"><img src="images/wait.gif" /><p>���ݼ�����...<br/>�������ĵȴ���</p></div>'
+	'</div>'
+'</div>'
);
xmlHttp2.onreadystatechange = writePageInfo;
xmlHttp2.open("GET", pageName, true);
xmlHttp2.send(null);
//xmlHttp2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//xmlHttp2.setRequestHeader("If-Modified-Since", "0");
} 
����//���ҳ����Ϣ�Ļص�����
function writePageInfo(pageInfo) {
//���û�д���pageInfo���������ȡxmlHttp����O��Ӧ���
if (pageInfo == undefined) {
if (xmlHttp2.readyState == 4) {
var pageInfo = xmlHttp2.responseText;
document.getElementById("showdiv").innerHTML = pageInfo;
}
} else {
document.getElementById("showdiv").innerHTML = pageInfo;
}
}

