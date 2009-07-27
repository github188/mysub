var divMainHeight = "480px"; /*CONTAINER里包含的DIV的高度*/
var divMainWidth  = "480px";/*CONTAINER里包含的DIV的宽度*/
var fontSize = "20px";
var fontFamily = "font-family:Verdana,Arial,sans-serif";
var error =  "{\"items\":[],\"totalAmount\":\"0.00\"}";
var number = 0;
var billIndex = 0;
var billArray = 0;
var billFee = 0;
var fontsize = "30px";
var fontcolor = 0x000000;
var fontw = "border";

var ismppage = 0;
var ismpIndex = 0;
var ismpArray = 0;


function getBalance(){
  $getRemoteData("http://61.157.77.196:8002/webdispatch/fee.xface?ACCNBR="+$getCookie("ACCNBR"),createProcessDiv,true);
}

function getBill(date){
  $getRemoteData("http://61.157.77.196:8002/webdispatch/bill.xface?MONTH="+date+"&ACCNBR="+$getCookie("ACCNBR"),showBillPage,true);
}

function setIsmp(otherid,name){
   $getRemoteData("http://61.157.77.196:8002/webdispatch/orderismp.xface?TYPE=1&FUNCODE="+otherid+"&ACCNBR="+$getCookie("ACCNBR"),showResultPage,true);
}

function getIsmp(){
  $getRemoteData("http://61.157.77.196:8002/webdispatch/bookismp.xface",showIsmpPage,true);
}

function getOwnIsmp(){
  $getRemoteData("http://61.157.77.196:8002/webdispatch/bookedismp.xface"+"?ACCNBR="+$getCookie("ACCNBR"),showBusiPage,true);
}


function cancelIsmp(id,data){
    id = id.substring(id.length-1);
    var otherid = data[id].otherSystemId;
    $getRemoteData("http://61.157.77.196:8002/webdispatch/orderismp.xface?TYPE=2&FUNCODE="+otherid+"&ACCNBR="+$getCookie("ACCNBR"),showResult1Page,true);
}



function createProcessDiv(fee){
    fee = $parseJson(fee);
     if(fee==null||fee==""){
   		showErrorMsgPage("  很抱歉，暂时不能办理该项业务，请您稍后再试。");
   		return;
   }
   $("container").style.backgroundImage = "url(images/bjj.png)";
  
   var divv = $c("div");
   divv.setAttribute("id","menuPro");
   divv.style.position = "absolute";
   divv.style.left = "0";
   divv.style.top = "0";
	divv.style.width = divMainWidth;
	divv.style.height = divMainHeight;
   var div = document.createElement("div");
   div.style.position = "absolute";
   div.style.top = "0";
   div.style.left = "0";
   div.style.width = divMainWidth;
   div.style.height = divMainHeight;
   
   var div2 = document.createElement("div");
   div2.style.color="#fff";
   div2.style.fontWeight = "bold";
   div2.style.fontFamily = fontFamily;
   div2.style.fontSize = fontSize;
   div2.style.width="400px";
   div2.style.position = "absolute";
   div2.style.top = "70px";
   div2.style.margin="auto";
   div2.style.align="center";
   div2.style.height="400px";
   div2.style.paddingLeft="4px";
   div2.style.paddingRight="4px";
   
   div2.style.color = fontcolor;
   div2.style.fontSize = fontsize;
   div2.style.fontWeight = fontw;
   div.appendChild(div2);
   
   var div3 = document.createElement("div");
   div3.style.width = "400px";
   div3.style.margin = "auto";
   div3.style.height = "30px";
   var textNode1 = document.createTextNode("尊敬的客户:");
   div3.appendChild(textNode1);
   div2.appendChild(div3);
   
   var div4 = document.createElement("div");
   div4.style.height="60px";
   div4.style.marginTop="3px";
    div4.style.width="400px";
   
   var date = new Date();
   var textNode2 = $ct("  截止本月"); 
   div4.appendChild(textNode2);
   div4.appendChild($ct(date.getDate()));
   div4.appendChild($ct("日，您号码为"));
   div4.appendChild($ct(fee.accNbr));
   div4.appendChild($ct("的余额情况如下:"));
   div2.appendChild(div4);
 
   var div5 = document.createElement("div");
       div5.style.marginTop = "3px";
       div5.style.height = "30px";
   var div6 = document.createElement("div");
       div6.style.height = "30px";
   var div7 = document.createElement("div");
       div7.style.height = "30px";
   var textNode3 = document.createTextNode("当前可用余额为：");
   var textNode5 = document.createTextNode("当月欠费："); 
   var textNode6 = document.createTextNode("当月消费：");
   var span = document.createElement("span");
   var span1 = document.createElement("span");
   var span2 = document.createElement("span");
   
   span.appendChild($ct($f(fee.balance)));
   span1.appendChild($ct($f(fee.owe)));
   span2.appendChild($ct(fee.billAmount));
   var textNode4 = document.createTextNode("元");
   var textNode7 = document.createTextNode("元");
   var textNode8 = document.createTextNode("元");
   div5.appendChild(textNode3);
   div5.appendChild(span);
   div5.appendChild(textNode4);
   
   div6.appendChild(textNode5);
   div6.appendChild(span1);
   div6.appendChild(textNode7);
   
   div7.appendChild(textNode6);
   div7.appendChild(span2);
   div7.appendChild(textNode8);
   div2.appendChild(div5);
   div2.appendChild(div6);
   div2.appendChild(div7);
   
   
   var div8 = $c("div");
   var div9 = $c("div");
   div8.appendChild($ct("  上一页"));
   div9.appendChild($ct(" 首 页"));
   div8.style.fontSize = fontsize;
   div9.style.fontSize = fontsize;
   div8.style.position = "absolute";
   div9.style.position = "absolute";
   div8.style.top = "413px";
   div8.style.left = "80px";
   div8.style.color = "white";
   div9.style.top = "413px";
   div9.style.left = "270px";
   div9.style.color = "white";
   div8.style.cursor = "pointer";
   div9.style.cursor = "pointer";
   div8.addEventListener('click', function () {removeNowPage();showMainPage() }, true);  
   div9.addEventListener('click', function () {removeNowPage();showMainPage() }, true);    
   div.appendChild(div8);
   div.appendChild(div9);
   divv.appendChild(div);
   $("container").appendChild(divv);
  
}


function showMainPage(){
  $("container").style.backgroundImage = "url(images/bj.png)";
  var menu = $c("div");
  menu.setAttribute("id","menu");
  var div1 = $c("div");
  var div2 = $c("div");
  var div3 = $c("div");
  var div4 = $c("div");
  

  div1.style.position = "absolute";
    div1.style.top = "10px";
      div1.style.left = "0";
        div1.style.width = "150px";
          div1.style.height = "180px";
            div1.style.textAlign = "center";
            div1.setAttribute("id","menu1M");
  div2.style.position = "absolute";
    div2.style.top = "10px";
      div2.style.left = "150px";
        div2.style.width = "150px";
          div2.style.height = "180px";
            div2.style.textAlign = "center";
             div2.setAttribute("id","menu2M");
             
  div3.style.position = "absolute";
    div3.style.top = "180px";
      div3.style.left = "0";
        div3.style.width = "150px";
          div3.style.height = "180px";
            div3.style.textAlign = "center";
             div3.setAttribute("id","menu3M");
  div4.style.position = "absolute";
    div4.style.top = "180px";
      div4.style.left = "150px";
        div4.style.width = "150px";
          div4.style.height = "180px";
            div4.style.textAlign = "center";
             div4.setAttribute("id","menu4M");
  var img1 = $c("img");
  var img2 = $c("img");
  var img3 = $c("img");
  var img4 = $c("img");
  	  img1.setAttribute("id","mainimg1");
      img2.setAttribute("id","mainimg2");
      img3.setAttribute("id","mainimg3");
      img4.setAttribute("id","mainimg4");
  img1.setAttribute("src","images/11.png");
  img2.setAttribute("src","images/22.png");
  img3.setAttribute("src","images/33.png");
  img4.setAttribute("src","images/44.png");
  
  div1.appendChild(img1);
  div2.appendChild(img2);
  div3.appendChild(img3);
  div4.appendChild(img4);
  menu.appendChild(div1);
  menu.appendChild(div2);
   menu.appendChild(div3);
  menu.appendChild(div4);
   $("container").appendChild(menu);
  
  div1.addEventListener('click',function(){ removeNowPage();getBalance();}, true);
  div2.addEventListener('click',function(){ removeNowPage();showSelectPage();}, true);
  div3.addEventListener('click',function(){ removeNowPage();getIsmp();}, true);
  div4.addEventListener('click',function(){ removeNowPage();getOwnIsmp();}, true);

}
function showBillPage(data){
   if(data==error){
   		showErrorMsgPage("  很抱歉，暂时不能办理该项业务，请您稍后再试。");
   		return;
   }
   var fee =  $parseJson(data);
   //if($("menuBill")){
   //	  $("container").appendChild($("menuBill"));
   //}else {
	
   var divv = $c("div");
   divv.setAttribute("id","menuBill");
   
   divv.style.position = "absolute";
   divv.style.left = "0";
   divv.style.top = "0";
	divv.style.width = divMainWidth;
	divv.style.height = divMainHeight;
	//divv.style.backgroundImage = "url(../images/x1_03.png)";
    		
   var div = document.createElement("div");
   div.setAttribute("id","backgroundDivB");
   div.style.position = "absolute";
   div.style.top = "0";
   div.style.left = "0";
   div.style.width = divMainWidth;
   div.style.height = divMainHeight;
   
   var div2 = document.createElement("div");
   div2.setAttribute("id","explainB");
   div2.style.color="#fff";
   div2.style.fontWeight = "bold";
   div2.style.fontFamily = fontFamily;
   div2.style.fontSize = fontSize;
   div2.style.width="370px";
   div2.style.position = "absolute";
   div2.style.top = "60px";
   div2.style.margin="auto";
   div2.style.align="center";
   div2.style.height="420px";
   div2.style.paddingLeft="4px";
   div2.style.paddingRight="4px";
   div2.style.overflow = "scroll";
   div2.style.color = fontcolor;
   div2.style.fontSize = fontsize;
   div2.style.fontWeight = fontw;
   div.appendChild(div2);
   
   var div3 = document.createElement("div");
   div3.style.width = "370px";
   div3.style.margin = "auto";
   div3.style.height = "30px";
   var textNode1 = document.createTextNode("尊敬的客户:");
   div3.appendChild(textNode1);
   div2.appendChild(div3);
   
   var div4 = document.createElement("div");
   div4.style.height="30px";
   div4.style.marginTop="3px";
    div4.style.width="370px";

   var textNode2 = document.createTextNode("  以下是您的消费账单:");
   div4.appendChild(textNode2);
   div2.appendChild(div4);
   
   var obj = fee.items;
   
   billArray = obj;
   billFee = fee;
   billLength = obj.length;
   var c = 0;
   if(billLength<5){
   	c = billLength;
   }else{
   	c = 5;
   }
    var index = 0;
   
   for(var i=0;i<c;i++){
   	 var div5 = $c("div");
     var textNode3 = $ct(obj[i].acctItemType);
     var textNode4 = $ct($f(obj[i].amount));
     var textNode5 = $ct("  ");
     div5.appendChild(textNode3);
     div5.appendChild(textNode5);
     div5.appendChild(textNode4);
     div5.appendChild($ct("元"));
     div5.style.fontSize = "25px";
     div2.appendChild(div5);
     if(i==(obj.length-1)){
       var d = $c("div");
       d.appendChild($ct("总费用"));
       d.appendChild($ct(" "));
       d.appendChild($ct($f(fee.totalAmount)));
       d.appendChild($ct("元"));
       d.style.fontSize = "25px";
       div2.appendChild(d);
     }
     billIndex = i;
   }
   
   var img3 = $c("img");
   img3.setAttribute("src","images/s.png");
   img3.style.position = "absolute";
   img3.style.top = "130px";
   img3.style.left = "370px";
   div.appendChild(img3);
   
   var img4 = $c("img");
   img4.setAttribute("src","images/x.png");
   img4.style.position = "absolute";
   img4.style.top = "240px";
   img4.style.left = "370px";
   div.appendChild(img4);
  
   img4.addEventListener('click', function () {changePage("DOWN","explainB"); }, true);  
   img3.addEventListener('click', function () {changePage("UP","explainB"); }, true); 
   
   var div8 = $c("div");
   var div9 = $c("div");
   div8.appendChild($ct("  上一页"));
   div9.appendChild($ct(" 首 页"));
   div8.style.fontSize = fontsize;
   div9.style.fontSize = fontsize;
   div8.style.position = "absolute";
   div9.style.position = "absolute";
   div8.style.top = "413px";
   div8.style.left = "80px";
   div8.style.color = "white";
   div9.style.top = "413px";
   div9.style.left = "270px";
   div9.style.color = "white";
   div8.style.cursor = "pointer";
   div9.style.cursor = "pointer";
   div8.addEventListener('click', function () {removeNowPage();showSelectPage() }, true);  
   div9.addEventListener('click', function () {removeNowPage();showMainPage() }, true);    
   div.appendChild(div8);
   div.appendChild(div9);
   divv.appendChild(div);
   $("container").appendChild(divv);
   //}
}

/**增值业务订购**/
function showIsmpPage(data){
   //测试用
   //data = "[{\"displayName\":\"财经新闻test\",\"introduction\":\"【财经新闻定制类】每个国内股市交易日，由网易财经编辑精心选择对沪深股市有重大影响的财经新闻信息，包括政策引导，股市波动等内容，为股民提供大环境信息。\",\"otherSystemId\":\"135000000000000000837\",\"value\":\"99元/月\"},{\"displayName\":\"财经新闻\",\"introduction\":\"【财经新闻定制类】每个国内股市交易日，由网易财经编辑精心选择对沪深股市有重大影响的财经新闻信息，包括政策引导，股市波动等内容，为股民提供大环境信息。\",\"otherSystemId\":\"135000000000000000837\",\"value\":\"5元/月\"},{\"displayName\":\"超级QQ\",\"introduction\":\"超级QQ是为不方便上网的，手机不离身的用户量身打造的一款结合QQ使用和手机特权VIP的短信增值业务。用户开通业务后，可用手机实在QQ24小时在线，接收贴心短信提醒等20多项功能，同时享有抢先体验腾讯最新的手机软件，手机游戏的特权，让您成为时尚精明的手机潮人。\",\"otherSystemId\":\"135000000000000000773\",\"value\":\"10元/月\"},{\"displayName\":\"短信百事通\",\"introduction\":\"对手机用户在生活工作中遇-需要即时查询的资讯问题，通过完善的人工座席平台，对短信提问进行即时的人工多渠道查询，并以短信的方式迅速作答。\",\"otherSystemId\":\"135000000000000001801\",\"value\":\"10元/月\"},{\"displayName\":\"新闻冲浪\",\"introduction\":\"综合国内、国际、体育、财经、娱乐、科技等各类重大突发事件，用户可以及时知道讯息万千的世界，掌控全球的各类新闻。\",\"otherSystemId\":\"135000000000000001059\",\"value\":\"8元/月\"},{\"displayName\":\"个人信息管理\",\"introduction\":\"个人信息管理（备份PIM产品）是一项帮助您方便转移和备份手机个人通信录的业务。\",\"otherSystemId\":\"135000000000000000467\",\"value\":\"3元/月\"}]";
   data = $parseJson(data);
   if(data==null||data==""){
  	  showErrorPage("  很抱歉，暂时不能办理该项业务，请您稍后再试。");
	  return;
   }
   $("container").style.backgroundImage = "url(images/bjjj.png)";
   var divv = $c("div");
   divv.setAttribute("id","menuIsmp");
   
   divv.style.position = "absolute";
   divv.style.left = "0";
   divv.style.top = "0";
	divv.style.width = divMainWidth;
	divv.style.height =divMainHeight;
   var div = document.createElement("div");
   div.setAttribute("id","backgroundDivI");
   div.style.position = "absolute";
   div.style.top = "0";
   div.style.left = "0";
   div.style.width = divMainWidth;
   div.style.height = divMainHeight;
   
   var div2 = document.createElement("div");
   div2.setAttribute("id","explainI");
   div2.style.color="#fff";
   div2.style.fontWeight = "bold";
   div2.style.fontFamily = fontFamily;
   div2.style.fontSize = fontSize;
   div2.style.width="440px";
   div2.style.position = "absolute";
   div2.style.top = "60px";
   div2.style.margin="auto";
   div2.style.align="center";
   div2.style.height="440px";
   div2.style.paddingLeft="4px";
   div2.style.paddingRight="4px";
   div2.style.overflow = "scroll";
   div2.style.color = fontcolor;
   div2.style.fontSize = fontsize;
   div2.style.fontWeight = "25px";
   div.appendChild(div2);
   
   var div3 = document.createElement("div");
   div3.style.width = "440px";
   div3.style.margin = "auto";
   div3.style.height = "30px";
   var textNode1 = document.createTextNode("尊敬的客户:");
   div3.appendChild(textNode1);
   div2.appendChild(div3);
   
   var div4 = document.createElement("div");
   div4.style.height="30px";
   div4.style.marginTop="3px";
    div4.style.width="440px";
    
   var textNode2 = document.createTextNode("  以下是可订制增值业务:");
   div4.appendChild(textNode2);
   div2.appendChild(div4);
   var c =data.length;
   if(c>5){
     c = 5;
   }
   for(var i=0;i<c;i++){
		   var div5 = document.createElement("div");
		   div5.style.height="40px";
		   div5.appendChild($ct(data[i].displayName));
		   div5.appendChild($ct(" "));
		   div5.appendChild($ct(data[i].value));
		    var img = $c("img");
		    img.style.position = "absolute";
		    img.style.top = i*38+65+"px";
		    img.style.left = "345px";
		    img.setAttribute("src","images/ck.png");
		    img.setAttribute("id","images-"+i);
		    img.style.width="10px";
		    img.style.height="3px";
		    img.style.border="0";
		     
		    div5.appendChild(img);
		   
		    img.addEventListener('click',function(event)
					{removeNowPage();showMsgPage(event.target.getAttribute("id"),data);}, true);
		    div2.appendChild(div5);
     
     
    }
  
 
   var div8 = $c("div");
   var div9 = $c("div");
   div8.appendChild($ct("  上一页"));
   div9.appendChild($ct(" 首 页"));
   div8.style.fontSize = fontsize;
   div9.style.fontSize = fontsize;
   div8.style.position = "absolute";
   div9.style.position = "absolute";
   div8.style.top = "413px";
   div8.style.left = "80px";
   div8.style.color = "white";
   div9.style.top = "413px";
   div9.style.left = "270px";
   div9.style.color = "white";
   div8.style.cursor = "pointer";
   div9.style.cursor = "pointer";
   div8.addEventListener('click', function () {removeNowPage();showMainPage() }, true);  
   div9.addEventListener('click', function () {removeNowPage();showMainPage() }, true);    
   div.appendChild(div8);
   div.appendChild(div9);
   
   var img3 = $c("img");
   img3.setAttribute("src","images/s.png");
   img3.style.position = "absolute";
   img3.style.top = "130px";
   img3.style.left = "370px";
  // div.appendChild(img3);
   
   
   var img4 = $c("img");
   img4.setAttribute("src","images/x.png");
   img4.style.position = "absolute";
   img4.style.top = "240px";
   img4.style.left = "370px";
   //div.appendChild(img4);
   divv.appendChild(div);
   $("container").appendChild(divv);
   
}

/*增值业务介绍**/
function showMsgPage(id,data){
   id = id.substring(id.length-1);
    var intro = data[id].introduction;
    var otherid = data[id].otherSystemId;
    var name = data[id].displayName;
   var divv = $c("div");
   divv.setAttribute("id","menuMsg");
   
   divv.style.position = "absolute";
   divv.style.left = "0";
   divv.style.top = "0";
	divv.style.width = divMainWidth;
	divv.style.height = divMainHeight;
    var div = document.createElement("div");
   div.setAttribute("id","backgroundDivMsg");
   div.style.position = "absolute";
   div.style.top = "0";
   div.style.left = "0";
   div.style.width = divMainWidth;
   div.style.height = divMainHeight;
   
   var div2 = document.createElement("div");
   div2.setAttribute("id","explainMsg");
   div2.style.color="#fff";
   div2.style.fontWeight = "bold";
   div2.style.fontFamily = fontFamily;
   div2.style.fontSize = fontSize;
   div2.style.width="420px";
   div2.style.position = "absolute";
   div2.style.top = "60px";
   div2.style.margin="auto";
   div2.style.align="center";
   div2.style.height="400px";
   div2.style.paddingLeft="4px";
   div2.style.paddingRight="4px";
   div2.style.overflow = "scroll";
   div2.style.color = fontcolor;
   div2.style.fontSize = "25px";
   div2.style.fontWeight = fontw;
   div.appendChild(div2);
   
   var div3 = document.createElement("div");
   div3.style.width = "420px";
   div3.style.margin = "auto";
   div3.style.height = "30px";
   var textNode1 = document.createTextNode("业务介绍:");
   div3.appendChild(textNode1);
   div2.appendChild(div3);
   
   var div4 = document.createElement("div");
   div4.style.height="400px";
   div4.style.marginTop="3px";
    div4.style.width="420px";

   var textNode2 = document.createTextNode("  "+intro);
   textNode2.setAttribute("id","textNodeIntro");
   div4.appendChild(textNode2);
   div2.appendChild(div4);
   
   
   var img3 = $c("img");
   img3.setAttribute("src","images/kt.png");
   img3.style.position = "absolute";
   img3.style.left = "175px";
   img3.style.top = "300px";
   img3.style.cursor = "pointer";
   img3.addEventListener('click', function () {removeNowPage();setIsmp(otherid,name); }, true); 
   div4.appendChild(img3);
   
   
  var div8 = $c("div");
   var div9 = $c("div");
   div8.appendChild($ct("  上一页"));
   div9.appendChild($ct(" 首 页"));
   div8.style.fontSize = fontsize;
   div9.style.fontSize = fontsize;
   div8.style.position = "absolute";
   div9.style.position = "absolute";
   div8.style.top = "413px";
   div8.style.left = "80px";
   div8.style.color = "white";
   div9.style.top = "413px";
   div9.style.left = "270px";
   div9.style.color = "white";
   div8.style.cursor = "pointer";
   div9.style.cursor = "pointer";
   div8.addEventListener('click', function () {removeNowPage();getIsmp() }, true);  
   div9.addEventListener('click', function () {removeNowPage();showMainPage() }, true);    
   div.appendChild(div8);
   div.appendChild(div9);
   divv.appendChild(div);
   $("container").appendChild(divv);
   //}
}

/**信息反馈页面*/
function showResultPage(msg){
   $("container").style.backgroundImage = "url(images/ts.png)";
   if($("menuResult")){
   	  $("container").appendChild($("menuResult"));
   }else {
	
   var divv = $c("div");
   divv.setAttribute("id","menuResult");
   
   divv.style.position = "absolute";
   divv.style.left = "0";
   divv.style.top = "0";
	divv.style.width = divMainWidth;
	divv.style.height = divMainHeight;
   var div = document.createElement("div");
   div.setAttribute("id","backgroundDivResult");
   div.style.position = "absolute";
   div.style.top = "0";
   div.style.left = "0";
   div.style.width = divMainWidth;
   div.style.height = divMainHeight;
   
   var div2 = document.createElement("div");
   div2.setAttribute("id","explainResult");
   div2.style.color="#fff";
   div2.style.fontWeight = "bold";
   div2.style.fontFamily = fontFamily;
   div2.style.fontSize = fontSize;
   div2.style.width="420px";
   div2.style.position = "absolute";
   div2.style.top = "60px";
   div2.style.margin="auto";
   div2.style.align="center";
   div2.style.height="160px";
   div2.style.paddingLeft="4px";
   div2.style.paddingRight="4px";
   div2.style.overflow = "scroll";
      div2.style.color = fontcolor;
   div2.style.fontSize = fontsize;
   div2.style.fontWeight = "30px";
   div.appendChild(div2);
   
   var div3 = document.createElement("div");
   div3.style.width = "420px";
   div3.style.margin = "auto";
   div3.style.height = "30px";
   var textNode1 = document.createTextNode("尊敬的客户:");
   div3.appendChild(textNode1);
   div2.appendChild(div3);
   
   var div4 = document.createElement("div");
   div4.style.height="30px";
   div4.style.marginTop="3px";
    div4.style.width="420px";
   div4.style.height="400px";
    var date   = new Date();
   var text = date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日";
   var textNode2 = document.createTextNode("  您已经于"+text+"成功订制本套餐业务。");
   div4.appendChild(textNode2);
   div2.appendChild(div4);
   
   var div8 = $c("div");
   var div9 = $c("div");
   div8.appendChild($ct("  返 回"));
   div9.appendChild($ct(" 首 页"));
   div8.style.fontSize = fontsize;
   div9.style.fontSize = fontsize;
   div8.style.position = "absolute";
   div9.style.position = "absolute";
   div8.style.top = "413px";
   div8.style.left = "80px";
   div8.style.color = "white";
   div9.style.top = "413px";
   div9.style.left = "270px";
   div9.style.color = "white";
   div8.style.cursor = "pointer";
   div9.style.cursor = "pointer";
   div8.addEventListener('click', function () {removeNowPage();getIsmp() }, true);  
   div9.addEventListener('click', function () {removeNowPage();showMainPage() }, true);    
   div.appendChild(div8);
   div.appendChild(div9);
   divv.appendChild(div);
   $("container").appendChild(divv);
   }
}



/**业务信息*/
function showBusiPage(data){
   data = $parseJson(data);
   $("container").style.backgroundImage = "url(images/bjjjjj.png)";
   var divv = $c("div");
   divv.setAttribute("id","menuBusi");
   
   divv.style.position = "absolute";
   divv.style.left = "0";
   divv.style.top = "0";
	divv.style.width = divMainWidth;
	divv.style.height = divMainHeight;
   var div = document.createElement("div");
   div.setAttribute("id","backgroundDivBusi");
   div.style.position = "absolute";
   div.style.top = "0";
   div.style.left = "0";
   div.style.width = "370px";
   div.style.height = "440px";
   
   var div2 = document.createElement("div");
   div2.setAttribute("id","explainBusi");
   div2.style.color="#fff";
   div2.style.fontWeight = "bold";
   div2.style.fontFamily = fontFamily;
   div2.style.fontSize = fontSize;
   div2.style.width="370px";
   div2.style.position = "absolute";
   div2.style.top = "60px";
   div2.style.align="center";
   div2.style.height="380px";
   div2.style.color = fontcolor;
   div2.style.fontSize = "25px";
   div2.style.fontWeight = fontw;
   div.appendChild(div2);
   
   var div3 = document.createElement("div");
   div3.style.width = "370px";
   div3.style.height = "30px";
   var textNode1 = document.createTextNode("尊敬的客户:");
   div3.appendChild(textNode1);
   div2.appendChild(div3);
   
   var div4 = document.createElement("div");
   div4.style.height="30px";
   div4.style.marginTop="3px";
    div4.style.width="370px";

   var textNode2 = document.createTextNode("以下是您订制的业务信息");
   div4.appendChild(textNode2);
   div2.appendChild(div4);
   if(data=="[]"){
     var div5 = document.createElement("div");
     div5.appendChild($ct("   您没有已订制增值业务。"));
     div2.appendChild(div5);
   }else{
     for(var i=0;i<data.length;i++){
     var div5 = document.createElement("div");
     div5.appendChild($ct(data[i].displayName));
     div5.appendChild($ct(" "));
     div5.appendChild($ct(data[i].value));
    var img = $c("img");
    img.setAttribute("src","images/td.png");
    img.setAttribute("id","images-"+i);
    img.style.width="10px";
    img.style.height="3px";
    img.style.border="0";
     
    div5.appendChild(img);
   
    img.addEventListener('click',function(event)
			{removeNowPage();cancelIsmp(event.target.getAttribute("id"),data);}, true);
    div2.appendChild(div5);
   }
  }
  
   
   var div8 = $c("div");
   var div9 = $c("div");
   div8.appendChild($ct("  上一页"));
   div9.appendChild($ct(" 首 页"));
   div8.style.fontSize = fontsize;
   div9.style.fontSize = fontsize;
   div8.style.position = "absolute";
   div9.style.position = "absolute";
   div8.style.top = "413px";
   div8.style.left = "80px";
   div8.style.color = "white";
   div9.style.top = "413px";
   div9.style.left = "270px";
   div9.style.color = "white";
   div8.style.cursor = "pointer";
   div9.style.cursor = "pointer";
   div8.addEventListener('click', function () {removeNowPage();showMainPage() }, true);  
   div9.addEventListener('click', function () {removeNowPage();showMainPage() }, true);    
   div.appendChild(div8);
   div.appendChild(div9);
   divv.appendChild(div);
   $("container").appendChild(divv);
}


function showResult1Page(){
    $("container").style.backgroundImage = "url(images/ts.png)";
   if($("menuResult1")){
   	  $("container").appendChild($("menuResult1"));
   }else {
	
   var divv = $c("div");
   divv.setAttribute("id","menuResult1");
   
   divv.style.position = "absolute";
   divv.style.left = "0";
   divv.style.top = "0";
	divv.style.width = divMainWidth;
	divv.style.height =divMainHeight;
	//divv.style.backgroundImage = "url(../images/x1_03.png)";
    		
   var div = document.createElement("div");
   div.setAttribute("id","backgroundDivResult1");
   div.style.position = "absolute";
   div.style.top = "0";
   div.style.left = "0";
   div.style.width = divMainWidth;
   div.style.height = divMainHeight;
   
   var div2 = document.createElement("div");
   div2.setAttribute("id","explainResult1");
   div2.style.color="#fff";
   div2.style.fontWeight = "bold";
   div2.style.fontFamily = fontFamily;
   div2.style.fontSize = fontSize;
   div2.style.width="400px";
   div2.style.position = "absolute";
   div2.style.top = "70px";
   div2.style.margin="auto";
   div2.style.align="center";
   div2.style.height="350px";
   div2.style.paddingLeft="4px";
   div2.style.paddingRight="4px";
   div2.style.overflow = "scroll";
   div2.style.color = fontcolor;
   div2.style.fontSize = "25px";
   div2.style.fontWeight = fontw;
   div.appendChild(div2);
   
   var div3 = document.createElement("div");
   div3.style.width = "400px";
   div3.style.margin = "auto";
   div3.style.height = "30px";
   var textNode1 = document.createTextNode("尊敬的客户:");
   div3.appendChild(textNode1);
   div2.appendChild(div3);
   
   var div4 = document.createElement("div");
   div4.style.height="300px";
   div4.style.marginTop="3px";
    div4.style.width="400px";
    
    
     var date   = new Date();
   var textb = date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日";

   var textNode2 = document.createTextNode("  您已经于"+textb+"成功退订本套餐业务。");
   div4.appendChild(textNode2);
   div2.appendChild(div4);
   
   var div8 = $c("div");
   var div9 = $c("div");
   div8.appendChild($ct("  返 回"));
   div9.appendChild($ct(" 首 页"));
   div8.style.fontSize = fontsize;
   div9.style.fontSize = fontsize;
   div8.style.position = "absolute";
   div9.style.position = "absolute";
   div8.style.top = "413px";
   div8.style.left = "80px";
   div8.style.color = "white";
   div9.style.top = "413px";
   div9.style.left = "270px";
   div9.style.color = "white";
   div8.style.cursor = "pointer";
   div9.style.cursor = "pointer";
   div8.addEventListener('click', function () {removeNowPage();getOwnIsmp() }, true);  
   div9.addEventListener('click', function () {removeNowPage();showMainPage() }, true);    
   div.appendChild(div8);
   div.appendChild(div9);
   divv.appendChild(div);
   $("container").appendChild(divv);
   }
}

/***账单查询选择月份**/
function showSelectPage(){
   $("container").style.backgroundImage = "url(images/bjjjj.png)";
   var divv = $c("div");
   divv.setAttribute("id","menuSelect");
   
   divv.style.position = "absolute";
   divv.style.left = "0";
   divv.style.top = "0";
	divv.style.width = divMainWidth;
	divv.style.height =divMainHeight;
	//divv.style.backgroundImage = "url(../images/x1_03.png)";
    		
   var div = document.createElement("div");
   div.setAttribute("id","backgroundDivSelect");
   div.style.position = "absolute";
   div.style.top = "0";
   div.style.left = "0";
   div.style.width = divMainWidth;
   div.style.height = divMainHeight;
   
   var div2 = document.createElement("div");
   div2.setAttribute("id","explainSelect");
   div2.style.color="#fff";
   div2.style.fontWeight = "bold";
   div2.style.fontFamily = fontFamily;
   div2.style.fontSize = fontSize;
   div2.style.width="450px";
   div2.style.position = "absolute";
   div2.style.top = "60px";
   div2.style.margin="auto";
   div2.style.align="center";
   div2.style.height="440px";
   div2.style.paddingLeft="4px";
   div2.style.paddingRight="4px";
   div2.style.overflow = "scroll";
   div2.style.color = fontcolor;
   div2.style.fontSize = fontsize;
   div2.style.fontWeight = fontw;
   div.appendChild(div2);
   
   var div3 = document.createElement("div");
   div3.style.width = "420px";
   div3.style.height = "30px";
   var textNode1 = document.createTextNode("尊敬的客户:");
   div3.appendChild(textNode1);
   div2.appendChild(div3);
   
   var div4 = document.createElement("div");
   div4.style.height="30px";
   div4.style.marginTop="3px";
    div4.style.width="420px";

   var textNode2 = document.createTextNode("  请你选择查询月份");
   div4.appendChild(textNode2);
   div2.appendChild(div4);
   
   var date = new Date();
   var year = date.getFullYear();
   var month = date.getMonth();
   var text1= year+"年"+month+"月";
   var text2= year+"年"+(month-1)+"月";
   var text3= year+"年"+(month-2)+"月";
   
   var num1 = month-1;
   var num2 = month-2;
   if(month<10){
      month = "0"+(month+"");
   }
   if(num1<10){
      num1 = "0"+(num1+"");
   }
   if(num2<10){
      num2 = "0"+(num2+"");
   }
   
   var div5 = document.createElement("div");
   div5.style.height="30px";
   div5.style.marginTop="8px";
    div5.style.width="420px";
    var textNode3 = document.createTextNode("  "+text1);
    
    var div6 = document.createElement("div");
   div6.style.height="30px";
   div6.style.marginTop="8px";
    div6.style.width="420px";
    var textNode4 = document.createTextNode("  "+text2);
    
    var div7 = document.createElement("div");
   div7.style.height="30px";
   div7.style.marginTop="8px";
    div7.style.width="420px";
    var textNode5 = document.createTextNode("  "+text3);
   
   
   div5.addEventListener('click', function () {removeNowPage();getBill(year+""+(month+"")) }, true);
   div6.addEventListener('click', function () {removeNowPage();getBill(year+""+(num1+"")) }, true); 
   div7.addEventListener('click', function () {removeNowPage();getBill(year+""+(num2+"")) }, true);  
  
   div5.appendChild(textNode3);
   div6.appendChild(textNode4);
   div7.appendChild(textNode5);

   div2.appendChild(div5);
   div2.appendChild(div6);
   div2.appendChild(div7);
   
    var div8 = $c("div");
   var div9 = $c("div");
   div8.appendChild($ct("  上一页"));
   div9.appendChild($ct(" 首 页"));
   div8.style.fontSize = fontsize;
   div9.style.fontSize = fontsize;
   div8.style.position = "absolute";
   div9.style.position = "absolute";
   div8.style.top = "413px";
   div8.style.left = "80px";
   div8.style.color = "white";
   div9.style.top = "413px";
   div9.style.left = "270px";
   div9.style.color = "white";
   div8.style.cursor = "pointer";
   div9.style.cursor = "pointer";
   div8.addEventListener('click', function () {removeNowPage();showMainPage() }, true);  
   div9.addEventListener('click', function () {removeNowPage();showMainPage() }, true);    
   div.appendChild(div8);
   div.appendChild(div9);
   divv.appendChild(div);
   $("container").appendChild(divv);
}


function showErrorMsgPage(msg){

   if($("menuError")){
   	  $("container").appendChild($("menuError"));
   }else {
	
   var divv = $c("div");
   divv.setAttribute("id","menuError");
   
   divv.style.position = "absolute";
   divv.style.left = "0";
   divv.style.top = "0";
	divv.style.width = divMainWidth;
	divv.style.height =divMainHeight;
	//divv.style.backgroundImage = "url(../images/x1_03.png)";
    		
   var div = document.createElement("div");
   div.setAttribute("id","backgroundDivError");
   div.style.position = "absolute";
   div.style.top = "0";
   div.style.left = "0";
   div.style.width = divMainWidth;
   div.style.height = divMainHeight;
   
   var div2 = document.createElement("div");
   div2.setAttribute("id","explainError");
   div2.style.color="#fff";
   div2.style.fontWeight = "bold";
   div2.style.fontFamily = fontFamily;
   div2.style.fontSize = fontSize;
   div2.style.width="310px";
   div2.style.position = "absolute";
   div2.style.top = "60px";
   div2.style.margin="auto";
   div2.style.align="center";
   div2.style.height="350px";
   div2.style.paddingLeft="4px";
   div2.style.paddingRight="4px";
   div2.style.overflow = "scroll";
   div.appendChild(div2);
   
   var div3 = document.createElement("div");
   div3.style.width = "310px";
   div3.style.margin = "auto";
   div3.style.height = "18px";
   var textNode1 = document.createTextNode("尊敬的客户:");
   div3.appendChild(textNode1);
   div2.appendChild(div3);
   
   var div4 = document.createElement("div");
   div4.style.height="33px";
   div4.style.marginTop="3px";
    div4.style.width="300px";

   var textNode2 = document.createTextNode(msg);
   div4.appendChild(textNode2);
   div2.appendChild(div4);
   
  
   var img2 = document.createElement("img");
   img2.setAttribute("src","images/x.png");
   img2.style.position = "absolute";
   img2.style.top = "350px";
   img2.style.left = "220px";
   img2.style.cursor = "pointer";
   img2.addEventListener('click', function () {removeNowPage();$("container").appendChild($("menu")) }, true);    
   div.appendChild(img2);
   divv.appendChild(div);
   $("container").appendChild(divv);
   }
}



function showInputNbrPage(){
$("container").style.backgroundImage = "url(images/w.png)";
   var divv = $c("div");
   divv.setAttribute("id","menuNbr");
   
   divv.style.position = "absolute";
   divv.style.left = "0";
   divv.style.top = "0";
	divv.style.width = divMainWidth;
	divv.style.height =divMainHeight;

   var div = document.createElement("div");
   div.setAttribute("id","backgroundDivNbr");
   div.style.position = "absolute";
   div.style.top = "0";
   div.style.left = "0";
   div.style.width = divMainWidth;
   div.style.height = divMainHeight;
   
   var div2 = document.createElement("div");
   div2.setAttribute("id","explainNbr");
   div2.style.color="#fff";
   div2.style.fontWeight = "bold";
   div2.style.fontSize = fontsize;
   div2.style.width="420px";
   div2.style.position = "absolute";
   div2.style.top = "50px";
   div2.style.left = "10px";
   div2.style.margin="auto";
   div2.style.align="center";
   div2.style.height="380px";

   div2.style.overflow = "scroll";
   div.appendChild(div2);
   
   var div3 = document.createElement("div");
   div3.style.width = "420px";
   div3.style.margin = "auto";
   div3.style.height = "30px";
   var textNode1 = document.createTextNode("尊敬的客户:");
   div3.appendChild(textNode1);
   div2.appendChild(div3);
   
   var div4 = document.createElement("div");
   div4.style.height="30px";
   div4.style.marginTop="3px";
    div4.style.width="420px";

   var textNode2 = document.createTextNode("  请输入您的手机号码：。");
   div4.appendChild(textNode2);
   div2.appendChild(div4);
   
   var div5 = $c("div");
   div5.style.position = "absolute";
   div5.style.top = "110px";
   div5.style.left = "10px";
   div5.style.height="100px";
   div5.style.width="420px";
   var input  = $c("input");
   input.setAttribute("id","inputAcc");
   input.setAttribute("type","text");
   input.style.height="40px";
   input.style.width="220px";
   input.style.fontSize="35px";
   
   var bt = $c("img");
   bt.setAttribute("src","images/qd.png");
   bt.addEventListener('click', function () {addCookie() }, true); 
   div5.appendChild(input);
   div5.appendChild(bt);
   div2.appendChild(div5);
   divv.appendChild(div);
   $("container").appendChild(divv);
}

function changePage(mode,div){

   if((billIndex == billArray.length-1)&&mode=="DOWN"){
   		return;
   }
   if((billIndex <= 4)&&mode=="UP"){
   		return;
   }
   
   
   var divParent = $(div);
   while (divParent.firstChild) {
            var oldNode = divParent.removeChild(divParent.firstChild);
                oldNode = null;
   }
   
   
   var arry = createChangePage(billArray,mode,billIndex);
   
   var div3 = document.createElement("div");
   div3.style.width = "440px";
   div3.style.margin = "auto";
   div3.style.height = "30px";
   var textNode1 = document.createTextNode("尊敬的客户:");
   div3.appendChild(textNode1);
   divParent.appendChild(div3);
   
   var div4 = document.createElement("div");
   div4.style.height="30px";
   div4.style.marginTop="3px";
    div4.style.width="440px";

   var textNode2 = document.createTextNode("  以下是您的消费账单:");
   div4.appendChild(textNode2);
   divParent.appendChild(div4);
  
   if("DOWN"==mode){
      if(billIndex+5<billArray.length-1){
        billIndex+=5;
      }else{
         billIndex = billArray.length-1;
      }
      
   }
       
   for(var i=0;i<arry.length;i++){
   	 var div5 = $c("div");
     var textNode3 = $ct(arry[i].acctItemType);

     var textNode4 = $ct($f(arry[i].amount));
     var textNode5 = $ct(" ");
     div5.appendChild(textNode3);
     div5.appendChild(textNode5);
     div5.appendChild(textNode4);
     div5.appendChild($ct("元"));
     div5.style.fontSize = "25px";
     divParent.appendChild(div5);
     if(i==(arry.length-1)){
       var d = $c("div");
       d.appendChild($ct("总费用"));
       d.appendChild($ct(" "));
	   
       d.appendChild($ct($f(billFee.totalAmount)));
       d.appendChild($ct("元"));
       d.style.fontSize = "25px";
       divParent.appendChild(d);
     }
   }
   
}

function createChangePage(arry,mode,index){
  if(mode=="UP"){
      if(billArray.length-1==index){
          var i= billArray.length%5;
	      index = index - i;
	       var arr = new Array(5);
		     arr[0] = arry[index];
		     arr[1] = arry[index-1];
		     arr[2] = arry[index-2];
		     arr[3] = arry[index-3];
		     arr[4] = arry[index-4];
		     billIndex = index;
		     return arr;
	  }else{
          if(index > 4 ){
	         var arr = new Array(5);
		     arr[0] = arry[index];
		     arr[1] = arry[index-1];
		     arr[2] = arry[index-2];
		     arr[3] = arry[index-3];
		     arr[4] = arry[index-4];
		     billIndex = index -  5;
		     return arr;
	        }    
      }
      
      
  }else if(mode=="DOWN"){
    if(index<billArray.length-5){
      var arr = new Array(5);
      arr[0] = billArray[index+1];
      arr[1] = billArray[index+2];
      arr[2] = billArray[index+3];
      arr[3] = billArray[index+4];
      arr[4] = billArray[index+5];
      return arr;
    }else{
        var arr = new Array(billArray.length-1-billIndex);
        var j = 0;
        for(var x = billIndex+1;x<billArray.length;x++){
           arr[j] = arry[x];
           j++;
        }
        return arr;
    }
  }
}



function removeMainPage(pram){
   $("container").removeChild($("menu"));
}
function removeProcessPage(){
  $("container").removeChild($("menuPro"));

}

function removeIsmpPage(){
  $("container").removeChild($("menuIsmp"));

}

function removeBillPage(){
  var con = $("container");
  while (con.firstChild) {
            var oldNode = con.removeChild(con.firstChild);
                oldNode = null;
   }
}

function removeMsgPage(){
  var con = $("container");
  while (con.firstChild) {
            var oldNode = con.removeChild(con.firstChild);
                oldNode = null;
   }
}

function removeResultPage(){
  $("container").removeChild($("menuResult"));
}

function removeResult1Page(){
  $("container").removeChild($("menuResult1"));

}

function removeBusiPage(){
  var con = $("container");
  while (con.firstChild) {
            var oldNode = con.removeChild(con.firstChild);
                oldNode = null;
   }
}

function removeSelectPage(){
  $("container").removeChild($("menuSelect"));

}

function removeErrorMsgPage(){
  $("container").removeChild($("menuError"));

}

function onload(){
	var accnbr = $getCookie("ACCNBR");
	if(accnbr==""||accnbr==""){
		 showInputNbrPage(); 
		 return ;
	}else{
		showMainPage();
	}
}

function addCookie(){
	var acc = $("inputAcc").getAttribute("value");
	$writeCookie("ACCNBR", acc, 31*24);
	removeNowPage();
	showMainPage();
}

function removeNowPage(){
  var con = $("container");
  while (con.firstChild) {
            var oldNode = con.removeChild(con.firstChild);
                oldNode = null;
   }
}

