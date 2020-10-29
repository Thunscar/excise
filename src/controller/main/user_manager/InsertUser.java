package controller.main.user_manager;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
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

@WebServlet(urlPatterns = "/insertUser.do")
public class InsertUser extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");

        //获取数据
        String userInfo = request.getParameter("user");

        System.out.println(userInfo);

        Gson gson = new GsonBuilder().serializeNulls().create();
        User user = gson.fromJson(userInfo,User.class);

        System.out.println(user);

        UserDao dao = new UserDao();
        boolean isSuccess = dao.insertUser(user);

        HashMap<String,Object> map = new HashMap<>();

        if(isSuccess){
            map.put("code",0);
            map.put("message","添加普通用户成功");
        }else{
            map.put("code",-1);
            map.put("message","添加用户失败!\n请检查用户信息是否正确");
        }

        String jsonStr = new Gson().toJson(map);
        response.setContentType("text/html;charset=utf-8");
        PrintWriter out = response.getWriter();
        out.print(jsonStr);
        out.flush();
        out.close();
    }
}
