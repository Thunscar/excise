package controller;

import com.google.gson.Gson;
import dao.UserDao;
import vo.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

@WebServlet(urlPatterns = "/login.do")
public class LoginController extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        request.setCharacterEncoding("utf-8");


        System.out.println(request.getServletPath());

        //获取请求端的数据
        String userName = request.getParameter("userName");
        String password = request.getParameter("password");
        String userVCode = request.getParameter("userCode");
        String autoLogin = request.getParameter("autoLogin");


        HttpSession session = request.getSession();
        String vCode = (String) session.getAttribute("vCode");

        Map<String,Object> map = new HashMap<>();


        if(!vCode.equalsIgnoreCase(userVCode)){//验证码不正确
            map.put("code",1);
            map.put("info","验证码错误!");
        }else{//验证码正确 检查用户名
            UserDao userDao = new UserDao();
            if(userDao.getUserByUserName(userName)==null){//用户名查找失败
                map.put("code",2);
                map.put("info","用户名不存在!");
            }else{//用户名正确 比对密码
                User user = userDao.getUserByUserName(userName);
                if(!user.getPassword().equals(password)){
                    map.put("code",3);
                    map.put("info","密码不正确!");
                }else{//密码正确 登录成功
                    //将User存入session
                    session.setAttribute("User",user);

                    if(autoLogin.equals("true")){//用户勾选了一周免登录  设置Cookie
                        Cookie cookieUserName = new Cookie("userName",user.getUserName());
                        Cookie cookiePassword = new Cookie("password",user.getPassword());

                        System.out.println(user.getUserName() + "  " + user.getPassword() +" 保存到Cookie");

                        cookieUserName.setMaxAge(60*60*24*7);
                        cookiePassword.setMaxAge(60*60*24*7);
                        response.addCookie(cookieUserName);
                        response.addCookie(cookiePassword);
                    }

                    map.put("code",0);
                    map.put("info","登陆成功!");

                }
            }
        }


        String jsonString = new Gson().toJson(map);

        response.setContentType("text/html;charset=utf-8");

        PrintWriter out = response.getWriter();

        out.print(jsonString);
        out.flush();
        out.close();

        System.out.println(request.getServletPath()+" exit");
    }
}
