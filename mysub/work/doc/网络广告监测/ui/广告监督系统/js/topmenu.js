
function switchTag(tag,sub_nav)
{
//	alert(tag);
//	alert(sub_nav);
	for(i=1; i <5; i++)
	{
		if ("tag"+i==tag)
		{
			document.getElementById(tag).getElementsByTagName("a")[0].className="selectli"+i;
			
		}else{
			document.getElementById("tag"+i).getElementsByTagName("a")[0].className="";
			
		}
		if ("sub_nav"+i==sub_nav)
		{
			document.getElementById(sub_nav).className="";
		}else{
			document.getElementById("sub_nav"+i).className="hidesub_nav";
		}
		document.getElementById("sub_nav").className=sub_nav;
	}
}
