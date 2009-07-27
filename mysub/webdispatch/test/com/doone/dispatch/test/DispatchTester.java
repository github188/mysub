package com.doone.dispatch.test;

import java.io.BufferedInputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.URL;

import junit.framework.TestCase;

public class DispatchTester extends TestCase {

	protected void setUp() throws Exception {
		super.setUp();
	}
	
	public void test_dispatch_url()throws Exception
	{
			URL url = new URL("http://127.0.0.1:7001/scinterface/demo.xface");
			Reader reader = new InputStreamReader(new BufferedInputStream(url.openStream())); 
			StringBuffer buffer = new StringBuffer();
            int c; 
            while ((c = reader.read()) != -1) { 
            	buffer.append((char)c);
            } 
            reader.close();
            System.out.println(buffer.toString());

	}

}
