package com.java.login;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class LoginServlet extends HttpServlet  
{
	private static final long serialVersionUID = -3041268828828584601L;

	protected void doPost(HttpServletRequest req,HttpServletResponse res)throws ServletException,IOException
	{
		String user=req.getParameter("username");
		String pass=req.getParameter("password");
        if(user.equals("admin") && pass.equals("admin"))
        {
        	res.setStatus(200);
        }
		else
		{
			res.setStatus(401);
		}
			
	}
}