package com.doone.dispatch.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;



public class AccNbrFilter implements Filter {

	public void destroy() {
	}

	public void init(FilterConfig arg0) throws ServletException {
	}

	/**
	 * 获取手机业务号码
	 */
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain) throws IOException,
			ServletException {
		HttpServletRequest req = (HttpServletRequest) request;
		String accnbr = "18908201001";
		if (req.getSession().getAttribute("ACCNBR") == null) {
			try {
				java.util.Enumeration headerNames = req.getHeaderNames();
				while (headerNames.hasMoreElements()) {
					String headernames = headerNames.nextElement().toString();
					System.out.println("header:"+headernames+" value:"+req.getHeader(headernames));
					if ("X-Up-Calling-Line-Id".equals(headernames)) {
						String user_callings = req.getHeader(headernames);

						if (user_callings.substring(0, 3).trim().equals("+86")) {
							accnbr = user_callings.substring(3, 14);
						} else {
							accnbr = user_callings;
						}

					}
				}

				req.getSession().setAttribute("ACCNBR", accnbr);

			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		filterChain.doFilter(request, response);
	}
	


}
