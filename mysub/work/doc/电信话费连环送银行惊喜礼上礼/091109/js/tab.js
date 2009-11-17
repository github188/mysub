function secBoard_st_d(n)
{
 for(i=0;i<secTable_st_d.cells.length;i++)
 secTable_st_d.cells[i].className="sec_"+i;
 secTable_st_d.cells[n].className="sec_"+n+"_c";
 for(i=0;i<mainTable_st_d.tBodies.length;i++)
 mainTable_st_d.tBodies[i].style.display="none";
 mainTable_st_d.tBodies[n].style.display="block";
}

var isIe=(document.all)?true:false;

function mousePosition(ev)
{
if(ev.pageX || ev.pageY)
{
return {x:ev.pageX, y:ev.pageY};
}
return {
x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,y:ev.clientY + document.body.scrollTop - document.body.clientTop
};
}
//弹出方法
function showMessageBox()
{
//closeWindow();
var bWidth=parseInt(document.documentElement.scrollWidth);
var bHeight=parseInt(document.documentElement.scrollHeight);
var cWidth=bWidth/2-100;
var cHeight=bHeight/1.5;


var back=document.createElement("div");
back.id="back";
var styleStr="top:0px;left:0px;position:absolute;background:#333;width:"+bWidth+"px;height:"+bHeight+"px;";
styleStr+=(isIe)?"filter:alpha(opacity=0);":"opacity:0;";
back.style.cssText=styleStr;
document.body.appendChild(back);


var mesW=document.createElement("div");
mesW.id="mesWindow";
mesW.className="mesWindow";
mesW.innerHTML="<div><img src=\"images/index/tab/loading04.gif\" width=\"300\" height=\"100\" /></div>";
styleStr="left:"+cWidth+"px;top:"+cHeight+"px;position:absolute;width:300px;height:100px;";
mesW.style.cssText=styleStr;
document.body.appendChild(mesW);

}


//测试弹出
function testMessageBox(ev)
{
var objPos = mousePosition(ev);
messContent="";
showMessageBox();
}