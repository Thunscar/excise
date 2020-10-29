package controller.register;

import com.google.gson.Gson;
import dao.UserDao;
import vo.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

@WebServlet(urlPatterns = "/checkUserName.do")
public class CheckUserNameServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        request.setCharacterEncoding("utf-8");

        String userName = request.getParameter("userName");


        Map<String,Object> map = new HashMap<>();

        UserDao dao = new UserDao();
        User user = dao.getUserByUserName(userName);

        if(user == null){
            map.put("code",0);
            map.put("info","用户名可用");
        }else{
            map.put("code",1);
            map.put("info","用户名已被注册");
        }


        String jsonString = new Gson().toJson(map);
        response.setContentType("text/html;charset=utf-8");
        PrintWriter out = response.getWriter();
        out.print(jsonString);
        out.flush();
        out.close();

    }

}
