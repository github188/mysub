<%@ page contentType="text/html; charset=GBK" %>
<jsp:directive.page import="com.doone.fj1w.fj1w.login.WebAuth"/>
<jsp:directive.page import="com.doone.fj1w.fj1w.login.bean.RegistDataBean"/>
<jsp:directive.page import="com.doone.fj1w.fj1w.login.bean.LoginDataBean"/>
<jsp:directive.page import="java.util.HashMap"/>
<jsp:directive.page import="com.doone.iossp.FormBody"/>
<jsp:directive.page import="java.util.Arrays"/>
<jsp:directive.page import="com.doone.fj1w.fj1w.login.bean.ProductRelateDate"/>
<jsp:directive.page import="com.doone.util.FileLogger"/>
<jsp:directive.page import="com.doone.fj1w.common.AccesslogBean"/>
<jsp:directive.page import="com.doone.fj1w.fj1w.order.udb.udbUnionAccount"/>
<%@ page import="com.doone.fj1w.fj1w.login.bean.LoginDataBean"%>
<jsp:directive.page import="java.text.SimpleDateFormat"/>
<jsp:directive.page import="java.util.Date"/>

<% 
	AccesslogBean oAccesslogBean = new AccesslogBean();
	oAccesslogBean.setAffairName("�й���������Ӫҵ�����Ĵ�->ͨ��֤����");
	oAccesslogBean.setPurviewCode("");
	AccesslogBean.addAccesslog(request, response, oAccesslogBean);

	WebAuth _webAuth = WebAuth.getInstance(request);
	RegistDataBean _registd = (RegistDataBean) _webAuth.getAuthUser();
	String citycode = _webAuth.getCityCode();
	String sno=request.getParameter("PRODNO");
	if(sno.indexOf("~")>0){
	sno=sno.substring(0,sno.indexOf("~"));
	}
	String pageno=request.getParameter("pageno");
	String productid="50";
	String userid="";
	boolean flag=false;
	if(_registd==null){
	    session.setAttribute("VISITOR_LOGIN_PATH","/view/order/udb/unionAccountMain.jsp");
            
		response.sendRedirect("/login.jsp");		
	}else{
	    HashMap mapRs = (HashMap) _registd.getProductAcount();
		Object[] o = mapRs.keySet().toArray();
		Arrays.sort(o);
				
		for(int i=0 ; i<o.length;i++){
		    ProductRelateDate _product = (ProductRelateDate) mapRs.get(o[i]);
			if (_product.getPhonenum().equals(sno) && _product.getProductid().equals("50")){			 
			  flag = true;
			  break;
			}
		}
		
		if(!flag){		
		   response.sendRedirect("/view/order/udb/unionAccountMain.jsp");
		}
		
		
	}
	
	udbUnionAccount udbUac=new udbUnionAccount(citycode,sno,productid,"0");
	String policyTable=udbUac.getPWpolicyTable();
	String alias = udbUac.getAlias();
	FormBody bindingFB=udbUac.getMainBindingNum(citycode,sno,productid);
	FormBody bindingIDFB=udbUac.getBindingId(citycode,sno,productid);
	String bindingAccessNo = "";
	String bindproductid="";
	String bindingID="";
	String display="none";
	String display2="none";
	if(bindingFB==null){
	   bindingAccessNo = "�Բ���ϵͳ��æ��";
	   display="";
	   display2="none";
	}else{
	   if(bindingFB.getString("result").equals("0")){
	       bindingAccessNo = "";
	       display="none";
	       display2="";
	   }else if(bindingFB.getString("result").equals("1")){
	       bindingAccessNo = "�Բ���ϵͳ��æ��";
	       display="";
	       display2="none";
	   }else if(bindingFB.getString("result").equals("2")){
	       bindingAccessNo = bindingFB.getString("phonenum");
	       bindproductid = bindingFB.getString("productid");
	      
	       display="";
	       display2="none";
	       
	       if(bindingIDFB==null){
	          bindingAccessNo = "�Բ���ϵͳ��æ��";
		      display="";
		      display2="none";
	       }else{
			   if(bindingIDFB.getString("result").equals("0")){
			       bindingAccessNo = "";
			       display="none";
			       display2="";
			   }else if(bindingIDFB.getString("result").equals("1")){
			       bindingAccessNo = "�Բ���ϵͳ��æ��";
			       display="";
			       display2="none";
			   }else if(bindingIDFB.getString("result").equals("2")){
			        bindingID = bindingIDFB.getString("bindingid");
			   }
		   }
		}
	}	
	
	
	
	
	
	
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
<title>�й���������Ӫҵ�����Ĵ�</title>
<link rel="stylesheet" type="text/css" href="/css/sy.css" />
<link rel="stylesheet" type="text/css" href="/css/left.css" />
<link rel="stylesheet" type="text/css" href="/css/pst.css">
<script language="JavaScript" type="text/javascript" src="/common/js/prototype.js"></script>
<script language="JavaScript" type="text/javascript" src="/common/js/buffalo.js"></script>
<script language="JavaScript" type="text/javascript" src="/js/Tab.js"></script>
<script language="JavaScript" type="text/javascript" src="/js/Tab.js" ></script>
<script language="JavaScript" type="text/javascript" src="/js/common.js"></script>
<script type="text/javascript">
    function isInitPassword(password) {
	           var obj = new Object();
	           
	           var initType="PhoneInitPWD";
	           
	          
	           var citycode = "<%=citycode%>";
			   
			    buffalo.remoteCall("commonOrder.isInitPasswordAJ",[initType,citycode,password],function(reply) {
			 	    var obj_value =  reply.getResult();
			  		//alert(obj_value);
					if(obj_value == "0"){
							//alert("�ܱ�Ǹ���������õ�������ڼ򵥣����������ã�");
							document.changePwd_form.INIPASS.value="1";
		            }else{
		            		document.changePwd_form.INIPASS.value="0";
		            }
	           });
				
        }



    function  proof_diagram(src_id,conx){
		var num_pic = document.getElementsByName(src_id);		
		if(document.getElementById(src_id) != null)
		document.getElementById(src_id).src = conx+"/view/login/image.jsp?id="+ Math.random();
	}

     function autoSelected(idx){
         
         if(idx=="" || idx=="null"){
            idx = 0;
         }
         
	     var selectedStr="tagContent"+idx;
	     var tagss = document.getElementById("tags").getElementsByTagName("li");
	     var aass = tagss[idx];
		 
	     selectTag(selectedStr,aass);
	 
	 }

	function selectTag(showContent,selfObj){
	   
		
		// ������ǩ
		var tag = document.getElementById("tags").getElementsByTagName("li");
		var taglength = tag.length;
		for(i=0; i<taglength; i++){
			tag[i].className = "";
		}
		
		
		    selfObj.className = "selectTag";	
			//selfObj.parentNode.className = "selectTag";
		
		
		
		// ��������
		for(i=0; i<taglength; i++){
		    j=document.getElementById("tagContent"+i);
			j.style.display = "none";
			
		}
		
		document.getElementById(showContent).style.display = "block";
     }
     
     //���ñ�������
     function reSetAlias(){
        document.getElementById("alias").value="";
     }
     
     
     //�ύ��������
     function aliasCommit(){
        var sAlias = document.getElementById("alias").value;
        if(sAlias==""){
            alert("����д��Ҫ���õı�����");
	        document.getElementById("alias").focus();
	        return false;
        }else{
            var reg=new RegExp(/^[a-zA-Z]{1}([a-zA-Z0-9]|[_]){5,15}$/);           
            
			if(!reg.test(sAlias))
			{
				alert("�Բ���,������ı��������Ϲ淶������!");
				document.getElementById("alias").focus();
				return false;		
			}
            
        }
        document.alias_form.submit();
     }
     
     
     function changePolicy(updateFlag,ssPwdStaus,ssDeviceNo){
          if(updateFlag==""){
                alert("�Բ���,������Ը��±�ʶ����ȷ����ˢ��ҳ�������!");				
				return false;
          }else{
             document.getElementById("SupdateFlag").value=updateFlag;
          
          }
          
          if(ssPwdStaus==""){
                alert("�Բ���,������Ը��²�������ȷ����ˢ��ҳ�������!");				
				return false;
          }else{
               document.getElementById("SsPwdStaus").value=ssPwdStaus;
          }
          
          if(ssDeviceNo==""){
                alert("�Բ���,������Ը��µ�ҵ��ϵͳ��ʶ����ȷ����ˢ��ҳ�������!");				
				return false;
          }else{
               document.getElementById("SsDeviceNo").value=ssDeviceNo;
          }
          
          document.policy_form.submit();
          
     
     }
     
     function doCancelBinding(){
         if(document.getElementById("SmainAccNbr").value==""){
              alert("�Բ���,������Ϊ�գ�����ȡ����!");				
			  return false;
         }
         
         if(document.getElementById("SmainType").value==""){
              alert("�Բ���,����������Ϊ�գ�����ȡ����!");				
			  return false;
         }
         
         if(document.getElementById("SbindingAccNbr").value==""){
              alert("�Բ���,�󶨺���Ϊ�գ����ܽ�ȡ����!");				
			  return false;
         }
         
         if(document.getElementById("SbindingType").value==""){
              alert("�Բ���,�󶨺�������Ϊ�գ�����ȡ����!");				
			  return false;
         }
         
         if(document.getElementById("SbindingID").value==""){
              alert("�Բ���,�󶨱��Ϊ�գ�����ȡ����!");				
			  return false;
         }
         
         
         document.cancel_form.submit();
      
     }
     
     
     //�󶨿��
     function doBinding(){
     	if(document.getElementById("imainAccNbr").value==""){
              alert("�Բ���,����˺�Ϊ�գ�����д��Ҫ�󶨵Ŀ��!");		
              document.getElementById("imainAccNbr").focus();		
			  return false;
         }
         
         
         if(document.getElementById("iPassword").value==""){
              alert("�Բ���,�������Ϊ�գ�����д�������!");				
			  return false;
         }
         
         if(document.getElementById("INVALIDATE_T").value==""){
              alert("�Բ���,��֤��Ϊ�գ�����д��֤��!");				
			  return false;
         }       
     
     	 if(document.getElementById("NbindingAccNbr").value==""){
              alert("�Բ���,�󶨺���Ϊ�գ�������Ӱ󶨣���ˢ�º�����!");				
			  return false;
         }
         
         if(document.getElementById("NbindingType").value==""){
              alert("�Բ���,�󶨺�������Ϊ�գ�������Ӱ󶨣���ˢ�º�����!");				
			  return false;
         }
         
          document.binding_form.submit();
         
     }
	 
	 
	 //����ҳ��������
	 function resetPass(){	
	      document.getElementById("OLDPWD").value="";
		  document.getElementById("NEWPWD").value="";
		  document.getElementById("RE_NEWPWD").value="";
		  document.getElementById("yzm").value="";
	  }
	  
	  
	  
	  function commitPass(){
	  
	      var oldpwd = document.getElementById("OLDPWD").value;
		  var newpwd = document.getElementById("NEWPWD").value;
		  var re_newpwd = document.getElementById("RE_NEWPWD").value;
		  var yzmzz = document.getElementById("yzm").value;
	      var reg=new RegExp(/^\d*$/); 
		  if(oldpwd==""){
		       alert("�Բ���,��ǰ����Ϊ�գ�����д��ǰ����!");		
               document.getElementById("OLDPWD").focus();		
			   return false;
		  }else{
		       if(oldpwd.length<6){
			         alert("�Բ���,������ĵ�ǰ���볤�Ȳ���6λ��������6λ��������!");		
                     document.getElementById("OLDPWD").focus();		
			         return false;
			   }
		       	      
			   if(!reg.test(oldpwd)){
			         alert("�Բ���,������ĵ�ǰ���벻���Ϲ淶��������6λ��������!");		
                     document.getElementById("OLDPWD").focus();		
			         return false;
			   }
		  
		  }
		  
		  
		  if(newpwd==""){
		       alert("�Բ���,��������Ϊ�գ�����д��ǰ����!");		
               document.getElementById("NEWPWD").focus();		
			   return false;
		  }else{	   
		       if(oldpwd.length<6){
			         alert("�Բ���,��������������볤�Ȳ���6λ��������6λ��������!");		
                     document.getElementById("NEWPWD").focus();		
			         return false;
			   }   
			   if(!reg.test(newpwd)){
			         alert("�Բ���,��������������벻���Ϲ淶��������6λ��������!");		
                     document.getElementById("NEWPWD").focus();		
			         return false;
			   }
		  
		  }
		  	
			if(document.getElementById("INIPASS").value=="1"){
			    alert("�ܱ�Ǹ���������õ�������ڼ򵥣����������ã�");
			    document.getElementById("NEWPWD").focus();	
			    return false;
			}
			
			
		  
		   if(re_newpwd==""){
		       alert("�Բ���,ȷ������Ϊ�գ�����дȷ������!");		
               document.getElementById("RE_NEWPWD").focus();		
			   return false;
		  }else{	      
		       if(oldpwd.length<6){
			         alert("�Բ���,�������ȷ�����볤�Ȳ���6λ��������6λ��������!");		
                     document.getElementById("RE_NEWPWD").focus();		
			         return false;
			   }  
		       
			   if(!reg.test(re_newpwd)){
			         alert("�Բ���,�������ȷ�����벻���Ϲ淶��������6λ��������!");		
                     document.getElementById("RE_NEWPWD").focus();		
			         return false;
			   }
			    
				if(re_newpwd != newpwd){
				     alert("�Բ���,�������ȷ��������������벻һ�£���ȷ��!");		
                     document.getElementById("RE_NEWPWD").focus();		
			         return false;
				 
				}
		  
		  }
		  
		         
          if(yzmzz==""){
		       alert("�Բ���,��֤��Ϊ�գ�����д��֤��!");		
               document.getElementById("yzm").focus();		
			   return false;
		  }  
			
		  
            document.changePwd_form.submit();
	       
	  
	  }
	
</script>

</head>

<body class="boby">
<table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
  <tr>
    <td align="center">
    	<jsp:include flush="true" page="/common/head.jsp"></jsp:include>
    </td>
  </tr>
</table>

<table width="780" border="0" cellpadding="0" cellspacing="0" align="center">
  <tr>
    <td width="691" height="32" align="left" style="padding-left:10px;">����ǰλ�ã�<a href="/index.jsp">��ҳ</a> > <a href="/view/login/index.jsp">������ҳ</a> &gt; <a href="/view/new_order/index.jsp">ҵ�����</a> &gt; <span style="color:#fa4500">ͨ��֤����</span></td>
    <td width="89" align="right"><img src="/images/Bnt/Logout.gif" width="78" height="21" border="0" style="cursor:hand" onClick="javascript:window.location.href='/view/login/exit.jsp'"/></td>
  </tr>
</table> 
 
 
<table width="780" height="189" border="0" cellpadding="0" cellspacing="0" align="center">
  <tr>
    <td width="207" height="24" align="left" valign="top">
    	<jsp:include flush="true" page="/view/login/login_tree.jsp"></jsp:include>	
    </td>
    <td width="573" align="left" valign="top">	  
	  <table width="573" border="0" cellspacing="0" cellpadding="0" style="margin-bottom:8px;">
      <tr>
        <td width="5" align="left"><img src="/images/Area/Kuang_01.gif" width="5" height="6" /></td>
        <td width="559" background="/images/Area/Kuang_02.gif"></td>
        <td width="5" align="right"><img src="/images/Area/Kuang_03.gif" width="5" height="6" /></td>
      </tr>
      <tr>
        <td style="background-image:url(/images/Area/Kuang_04.gif); background-repeat:repeat-y;"></td>
        <td style="padding:15px;"><table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td><img src="/images/passport/passport_img.gif" width="315" height="67" /></td>
          </tr>
          <tr>
            <td height="30" style="padding-top:15px; border-bottom:#fdc28c 1px dotted;" align="center"><span style="font-size:16px;color:#f60;font-weight:bold;">���ã�</span><%=sno%> | <span style="color:#f60;"><a href="/view/login/exit.jsp">�˳���¼</a></span></td>
          </tr>
          <tr>
            <td height="30">&nbsp;</td>
          </tr>
          <tr>
            <td><div id="con">
  <ul id="tags">
    <li class="selectTag"><a href="javascript:void(0)" onClick="selectTag('tagContent0',this.parentNode)">ͳһ��������</a></li>
	<li><a href="javascript:void(0)" onClick="selectTag('tagContent1',this.parentNode)">������Թ���</a></li>
	<li><a href="javascript:void(0)" onClick="selectTag('tagContent2',this.parentNode)">ͨ��֤��</a></li>
    <li><a href="javascript:void(0)" onClick="selectTag('tagContent3',this.parentNode)">��������</a></li>
  </ul>
  <div id="tagContent">
  	<div id="tagContent0" class="tagContent selectTag">
      	  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="padding-top:20px;">
          <tr><td>
		   <form id="changePwd_form" name="changePwd_form" action="/view/order/udb/changePwdResult.jsp" method="post">
		   <input type="hidden" name="PRODUCTNUMBER" id="PRODUCTNUMBER" value="<%=sno%>" />
		   <input type="hidden" name="ORDERTYPE" id="ORDERTYPE" value="50" />	  	 
		   <input type="hidden" name="INIPASS" id="INIPASS" value="0" />  
  	  <table width="320" border="0" cellspacing="0" cellpadding="0" align="center">
  	    <tr>
  	      <td width="70" height="40">��ǰ���룺</td>
  	      <td width="250"><input type="password" name="OLDPWD" id="OLDPWD" class="textbox" maxlength="6"/></td>
	      </tr>
  	    <tr>
  	      <td height="40">�������룺</td>
  	      <td><input type="password" name="NEWPWD" id="NEWPWD" class="textbox" maxlength="6" onblur="isInitPassword(this.value);/></td>
	      </tr>
  	    <tr>
  	      <td height="40">����ȷ�ϣ�</td>
  	      <td><input type="password" name="RE_NEWPWD" id="RE_NEWPWD" class="textbox" maxlength="6"/></td>
	      </tr>
            	    <tr>
  	      <td height="40">�� ֤ �룺</td>
  	      <td><input name="yzm" id="yzm" type="text" class="textbox" style="width: 34%" maxlength="4">&nbsp;<span  onClick="proof_diagram('diagram2','')" style="cursor:pointer"><img  id="diagram2" src="/view/login/image.jsp" width="60" height="19" align="absmiddle"></span></td>
	      </tr>
  	    <tr>
  	      <td>&nbsp;</td>
  	      <td><font color="#999999">���볤��Ϊ6λ���֡������õ�ͨ��֤����ͬʱҲ��189�������롣</font></td>
	      </tr>
  	    <tr>
  	      <td colspan="2" align="center" height="60"><img src="/images/passport/ok_button.jpg" style="cursor:hand" onClick="commitPass()"/>
  	        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="/images/passport/reset_button.jpg"  style="cursor:hand" onClick="resetPass()" /></td>
  	      </tr>
	    </table>
		</form>
		</td></tr></table>
  	</div>
	<div id="tagContent1" class="tagContent"><table width="100%" border="0" cellspacing="0" cellpadding="0" style="padding-top:20px;">
          <tr><td>
		  <table width="480" border="0" cellspacing="0" cellpadding="0" align="center">
                <tr>
                  <td colspan="3" style="color:#999;" height="40" >��ܰ��ʾ��ҵ���������ڱ���������˽����ͬҵ������ö���ҵ�����룬һ������ĳ��ҵ��������ҵ�����룬ʹ�ø�ҵ��ʱ����ͨ��֤��¼������֤ҵ�����롣</td>
                  </tr>
              </table>
			  <br />
		  <%=policyTable%>
		  <form id="policy_form" name="policy_form" action="/view/order/udb/policyResult.jsp" method="post">
  	      
  	      <input type="hidden" name="SsDeviceNo" id="SsDeviceNo" value="" />
  	      <input type="hidden" name="SupdateFlag" id="SupdateFlag" value="" />
  	      <input type="hidden" name="SsPwdStaus" id="SsPwdStaus" value="" />
  	      <input type="hidden" name="policy_phone" id="policy_phone" value="<%=sno%>"/>
  	      </form>
          </td></tr></table></div>
	<div id="tagContent2" class="tagContent">      	  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="padding-top:20px;">
          <tr><td><table width="480" border="0" cellspacing="0" cellpadding="0" align="center">
            <tr>
              <td><font color="#999999">��ܰ��ʾ��һ���ֻ�ֻ�ܰ�һ��������룬�󶨺󣬿�ʹ���ֻ��������������ķ��ý����ڿ���˺��ϡ�</font></td>
            </tr>
            <tr>
              <td height="20"></td>
            </tr>
            <tr>
              <td height="90" background="/images/passport/pst_bd_bg.gif" >
              
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="display:<%=display%>">
                <tr>
                  <td width="170">&nbsp;</td>
                  <td width="210" style="color:#000;font-size:30px;line-height:30px;"><%=bindingAccessNo%></td>
                  <td><img src="/images/passport/nbd_button.jpg" style="cursor:hand" onClick="doCancelBinding()" /></td>
                </tr>
                <tr>
                <td colspan="3">
                  <form id="cancel_form" name="cancel_form" action="/view/order/udb/cancelBindingResult.jsp" method="post">  	      
		  	      <input type="hidden" name="SmainAccNbr" id="SmainAccNbr" value="<%=bindingAccessNo%>" />
		  	      <input type="hidden" name="SmainType" id="SmainType" value="<%=bindproductid%>" />
		  	      <input type="hidden" name="SbindingAccNbr" id="SbindingAccNbr" value="<%=sno%>" />
		  	      <input type="hidden" name="SbindingType" id="SbindingType" value="<%=productid%>"/>
		  	      <input type="hidden" name="SbindingID" id="SbindingID" value="<%=bindingID%>"/>
		  	      </form>
                </td>
                </tr>
              </table>
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="display:<%=display2%>">
                <tr>
                <td align="center" style="color:#000;font-size:15px;line-height:15px; padding-top:60px">����ͨ��֤����<%=sno%>��δ�󶨵��κο���˺��ϡ�</td>               
                </tr>
                </table>
              </td>
              </tr>
          </table>
              <table width="480" border="0" cellspacing="0" cellpadding="0" align="center">
                
                <tr>
                  <td height="20"></td>
                </tr>
                <tr>
                  <td>
                  <form id="binding_form" name="binding_form" action="/view/order/udb/do1BindingResult.jsp" method="post"> 
                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td height="28" width="35%" align="right" style="padding-right:10px;">��Ҫ�󶨵Ŀ���ʺţ�</td>
                      <td colspan="3"><input tabindex="1" type="text" name="imainAccNbr" id="imainAccNbr" class="textbox" /></td>
                      </tr>
                    <tr>
                      <td height="31" align="right" style="padding-right:10px;">������룺</td>
                      <td width="65%"><input tabindex="2" type="text" name="iPassword" id="iPassword" class="textbox" style="width:80px" /></td>
                      
                    </tr>
                     <tr>
                      <td width="35%" align="right" style="padding-right:10px;"> ��֤�룺</td>
                      <td width="65%"><input name="INVALIDATE_T" id="INVALIDATE_T" type="text" class="textbox" style="width: 34%" maxlength="4">&nbsp;<span  onClick="proof_diagram('diagram','')" style="cursor:pointer"><img  id="diagram" src="/view/login/image.jsp" width="60" height="19" align="absmiddle"></span></td>
                    </tr>
                  </table>
                   <input type="hidden" name="NbindingAccNbr" id="NbindingAccNbr" value="<%=sno%>" />
		  	       <input type="hidden" name="NbindingType" id="NbindingType" value="<%=productid%>"/>
                  </form>
                  </td>
                </tr>
                <tr>
                <td height="60" align="center"><img src="/images/passport/bd_button.jpg" style="cursor:hand" onClick="doBinding()"/></td>
                </tr>
              </table></td></tr></table></div>
    <div id="tagContent3" class="tagContent">      	  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="padding-top:20px;">
          <tr><td>
  	  <table width="420" border="0" cellspacing="0" cellpadding="0" align="center">
  	    
  	     <tr>
                  <td colspan="2"><font color="#999999">��ܰ��ʾ������������һ����ϲ���ĸ��Ա�����ͨ��֤�����������ڵ�¼ʹ��189���䡢����live�������ǿա������ֵȷ���</font></td>
         </tr>
  	    <tr>
  	      <td width="110" height="40">����ǰ�ı���Ϊ��</td>
  	      <td width="310" style="font-size:18px;font-weight:bold;"><span style="color:#000;"><%=alias%></span>&nbsp;@189.cn</td>
	      </tr>
  	    <tr>
  	      <td height="40" >���������ı�����</td>
  	      <td>
  	      <form id="alias_form" name="alias_form" action="/view/order/udb/aliasResult.jsp" method="post">
  	      <input type="text" name="alias" id="alias" class="textbox" style="width:160px;" /><span style="font-size:18px;font-weight:bold;">&nbsp;@189.cn</span>
  	      <input type="hidden" name="alias_phone" id="alias_phone" value="<%=sno%>" />
  	      </form>
		  </td>
	      </tr>
		  
  	    <tr>
  	      <td>&nbsp;</td>
  	      <td><font color="#999999">��Ч����Ϊ5-15�����ַ���ϣ��磺kevin_zhang
  	      ������Ӣ����ĸ��ͷ����ʹ�õ��ַ���Χ����A~Z��a~z��0~9����_����
</font></td>
	      </tr>
  	    <tr>
  	      <td height="40">&nbsp;</td>
  	      <td><!--  <input type="image" name="button7" id="button7" src="/images/passport/check_mail.gif" />--></td>
	      </tr>
  	    <tr>
  	      <td colspan="2" align="center" height="60"><img src="/images/passport/ok_button.jpg" style="cursor:hand" onClick="aliasCommit()" />
  	        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="/images/passport/reset_button.jpg" style="cursor:hand" onClick="reSetAlias()" /></td>
  	      </tr>
	    </table></td></tr></table></div>
  </div>	
</div></td>
          </tr>
        </table>	
		</td>
        <td style="background-image:url(/images/Area/Kuang_05.gif); background-repeat:repeat-y; background-position:right;"></td>
      </tr>
     <script type="text/javascript">
         autoSelected(<%=pageno%>);
     </script>
      
      <tr>
        <td height="6"><img src="/images/Area/Kuang_06.gif" width="5" height="6" /></td>
        <td background="/images/Area/Kuang_07.gif"></td>
        <td align="right"><img src="/images/Area/Kuang_08.gif" width="5" height="6" /></td>
      </tr>
    </table>
	
	<table width="573" border="0" cellspacing="0" cellpadding="0" style="margin-bottom:8px;">
  <tr>
    <td width="5" align="left"><img src="/images/Area/Kuang_01.gif" width="5" height="6" /></td>
    <td width="559" background="/images/Area/Kuang_02.gif"></td>
    <td width="5" align="right"><img src="/images/Area/Kuang_03.gif" width="5" height="6" /></td>
  </tr>
  <tr>
    <td style="background-image:url(/images/Area/Kuang_04.gif); background-repeat:repeat-y;"></td>
    <td style="padding:15px;"><table width="100%" border="0" cellspacing="0" cellpadding="0">
      
      <tr>
        <td height="30" style="padding-top:15px; border-bottom:#fdc28c 1px dotted;"><span style="font-size:16px;color:#f60;font-weight:bold;">ͨ��֤����ͨ��</span></td>
      </tr>
      <tr>
        <td height="159" valign="top">
		<table width="300" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td>&nbsp;</td>
  </tr>
</table>

		<table width="98%" border="0" cellspacing="0" cellpadding="0">
              <tr>
               <td height = "75" width="50%" align="center"><a href="/view/order/netsky/toLoveMusic.jsp"  target="_blank"><img src="/images/sso/imusic.jpg?PRODNO=<%=sno%>" /></a></td>
			   <td height = "75" width="50%" align="center"><a href="/view/order/netsky/to189Mail.jsp"  target="_blank"><img src="/images/sso/189mailBox.jpg?PRODNO=<%=sno%>" /></a>
               </td>
             </tr>
			 <tr>
               <td height = "10" width="50%" align="center"><a href="/view/order/netsky/unionSSO.jsp?sysid=53"  target="_blank"></a>               </td>
			   <td height = "10" width="50%" align="center" ><a href="/view/order/netsky/toNetskyTwo.jsp"  target="_blank"></a>               </td>
             </tr>
              <tr>
               <td height = "75" width="50%" align="center"><a href="/view/order/netsky/unionSSO.jsp?sysid=53"  target="_blank"><img src="/images/sso/supermessner.jpg" /></a>
               </td>
			   <td height = "75" width="50%" align="center" ><a href="/view/order/netsky/toNetskyTwo.jsp?PRODNO=<%=sno%>"  target="_blank"><img src="/images/sso/scvnetcn.gif" /></a>
               </td>
             </tr>
            </table></td>
      </tr>
    </table></td>
    <td style="background-image:url(/images/Area/Kuang_05.gif); background-repeat:repeat-y; background-position:right;"></td>
  </tr>
  <tr>
    <td height="6"><img src="/images/Area/Kuang_06.gif" width="5" height="6" /></td>
    <td background="/images/Area/Kuang_07.gif"></td>
    <td align="right"><img src="/images/Area/Kuang_08.gif" width="5" height="6" /></td>
  </tr>
</table>
	
	
	
	  </td>
  </tr>
</table>
<table width="780" border="0" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td align="center">
    	<jsp:include flush="true" page="/common/footer.jsp"></jsp:include>
    </td>
  </tr>
</table>
</body>
</html>
