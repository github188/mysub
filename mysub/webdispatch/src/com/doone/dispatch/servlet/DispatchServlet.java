package com.doone.dispatch.servlet;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.Reader;
import java.net.URL;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class DispatchServlet
 */
public class DispatchServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException {
		StringBuffer buffer = new StringBuffer();
		buffer.append("http://");
		buffer.append(Dispatch.URL);
		buffer.append(Dispatch.REQUEST_URI);
		buffer.append(request.getServletPath());
		buffer.append(this.getQueryString(request));
		System.out.println(buffer.toString());
		String result;
		try {
			result = dispatchURL(buffer.toString());
			response(response,result);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	
	
	private String dispatchURL(String urlPath) throws Exception{
		URL url = new URL(urlPath);
		Reader reader = new InputStreamReader(new BufferedInputStream(url.openStream())); 
		StringBuffer buffer = new StringBuffer();
        int c; 
        while ((c = reader.read()) != -1) { 
        	buffer.append((char)c);
        } 
        reader.close();
      return buffer.toString();
	}
	
	private void response(HttpServletResponse resp,String result) throws IOException{
		resp.setContentType("application/json;charset=UTF-8");
		PrintWriter printWriter = resp.getWriter();
		if (printWriter != null) {
			printWriter.write(result);
		}
	}
	
	private String getQueryString(HttpServletRequest req){
		StringBuffer stringBuffer = new StringBuffer();
		if(req.getQueryString() != null)
		{
			stringBuffer.append("?");
			stringBuffer.append(req.getQueryString());
//			stringBuffer.append("&");
//			stringBuffer.append("ACCNBR=");
//			stringBuffer.append(req.getSession().getAttribute("ACCNBR"));
		}
//		else
//		{
//			stringBuffer.append("?");
//			stringBuffer.append("ACCNBR=");
//			stringBuffer.append(req.getSession().getAttribute("ACCNBR"));
//		}
		return stringBuffer.toString();
	}
	
	
}
