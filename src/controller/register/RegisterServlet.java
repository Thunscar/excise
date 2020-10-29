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

@WebServlet(urlPatterns = "/register.do")
public class RegisterServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        System.out.println(request.getServletPath());

        request.setCharacterEncoding("utf-8");

        //获取输入端的数据
        String userName = request.getParameter("userName");
        String chrName = request.getParameter("chrName");
        String email = request.getParameter("email");
        String provinceName = request.getParameter("provinceName");
        String cityName = request.getParameter("cityName");
        String password = request.getParameter("password");


        User user = new User(userName,password,chrName,email,provinceName,cityName);
        UserDao dao = new UserDao();
        boolean success = dao.insertUser(user);

        Map<String,Object> map = new HashMap<>();

        if(success){
            map.put("code",0);
            map.put("info","注册成功!");
        }else{
            map.put("code",1);
            map.put("info","注册失败");
        }

        String jsonString = new Gson().toJson(map);
        response.setContentType("text/html;charset=utf-8");
        PrintWriter out = response.getWriter();
        out.print(jsonString);
        out.flush();
        out.close();

    }

}
