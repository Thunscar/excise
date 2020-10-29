package controller;

import com.google.gson.Gson;
import vo.User;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@WebServlet(urlPatterns = "/exitLogin.do")
public class exitLoginController extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        //创建Map保存返回信息
        Map<String,String> map = new HashMap<>();

        HttpSession session = request.getSession();
        if(session.getAttribute("User")!=null){
            User user = (User) session.getAttribute("User");
            System.out.println(new Date().toString() + " " + user + "退出登录");
            session.removeAttribute("User");

            map.put("code","100");
            map.put("info","退出账号成功");

            Cookie[] cookies = request.getCookies();
            for(Cookie cookie:cookies){
                if(cookie.getName().equals("userName")||
                        cookie.getName().equals("password")){

                    System.out.println(cookie.getName() + " Cookie已删除");

                    cookie.setMaxAge(0);
                    response.addCookie(cookie);
                }
            }
        }else{
            map.put("code","101");
            map.put("info","错误 未找到用户信息");
        }

        String jsonString = new Gson().toJson(map);
        response.setContentType("text/html;charset=utf-8");
        PrintWriter out = response.getWriter();
        out.print(jsonString);
        out.flush();
        out.close();
    }

}
